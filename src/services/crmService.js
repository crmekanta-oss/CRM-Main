import { supabase } from '../lib/supabase';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
// Store createdAt as ISO string internally; format only at display time
const formatDisplay = (isoStr) => {
  try {
    return new Date(isoStr).toLocaleString('en-IN', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch { return isoStr || '—'; }
};

export const crmService = {

  // ─── FETCH ALL FUNNELS ────────────────────────────────────────────────────
  async getAllFunnels() {
    try {
      const { data, error } = await supabase
        .from('funnels')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(this.mapFromDb);
    } catch (error) {
      console.error('Error in getAllFunnels:', error.message);
      return [];
    }
  },

  // ─── SAVE FUNNEL (INSERT / UPDATE) ────────────────────────────────────────
  async saveFunnel(funnel, user) {
    try {
      const dbData = this.mapToDb(funnel);
      if (!dbData.lead_source) throw new Error('lead_source is required');
      if (!funnel.isExisting && funnel.status !== 'Won' && !dbData.next_follow_up) {
        throw new Error('next_follow_up is required');
      }
      dbData.created_by = user?.name || 'admin';

      if (funnel.id) {
        const { data, error } = await supabase
          .from('funnels').update(dbData).eq('id', funnel.id).select();
        if (error) throw error;
        return this.mapFromDb(data[0]);
      }

      const { data, error } = await supabase
        .from('funnels').insert([dbData]).select();
      if (error) throw error;
      return this.mapFromDb(data[0]);
    } catch (error) {
      console.error('Error in saveFunnel:', error.message);
      throw error;
    }
  },

  // ─── UPDATE STATUS ────────────────────────────────────────────────────────
  async updateStatus(id, status, lostDropReason = '') {
    try {
      const { error } = await supabase
        .from('funnels')
        .update({ status, lost_drop_reason: lostDropReason || null })
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  },

  // ─── DELETE FUNNEL ────────────────────────────────────────────────────────
  async deleteFunnel(id) {
    try {
      const { error } = await supabase.from('funnels').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting funnel:', error.message);
      throw error;
    }
  },

  // ─── COMMENTS ─────────────────────────────────────────────────────────────
  async getComments(funnelId) {
    try {
      const { data, error } = await supabase
        .from('audit_comments').select('*')
        .eq('funnel_id', funnelId).order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(c => ({
        text: c.text, author: c.author, role: c.role,
        time: formatDisplay(c.created_at),
      }));
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return [];
    }
  },

  async addComment(funnelId, comment) {
    try {
      const { error } = await supabase.from('audit_comments').insert([{
        funnel_id: funnelId, author: comment.author,
        role: comment.role, text: comment.text,
      }]);
      if (error) throw error;
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  },

  // ─── FOLLOW-UP LOGS ───────────────────────────────────────────────────────
  async getFollowupLogs(funnelId) {
    try {
      const { data, error } = await supabase
        .from('followup_logs').select('*')
        .eq('funnel_id', funnelId).order('logged_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(row => ({
        id:               row.id,
        loggedBy:         row.logged_by,
        loggedAt:         formatDisplay(row.logged_at),
        followUpDate:     row.follow_up_date,
        customerResponse: row.customer_response,
        outcome:          row.outcome,
        nextFollowUp:     row.next_follow_up,
      }));
    } catch (error) {
      console.error('Error fetching followup logs:', error.message);
      return [];
    }
  },

  async addFollowupLog(funnelId, log) {
    try {
      const { data, error } = await supabase
        .from('followup_logs')
        .insert({
          funnel_id:         funnelId,
          logged_by:         log.loggedBy,
          follow_up_date:    log.followUpDate || null,
          customer_response: log.customerResponse,
          outcome:           log.outcome,
          next_follow_up:    log.nextFollowUp || null,
        })
        .select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding followup log:', error.message);
      throw error;
    }
  },

  async updateNextFollowup(funnelId, date) {
    try {
      const { error } = await supabase
        .from('funnels').update({ next_follow_up: date || null }).eq('id', funnelId);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating next followup:', error.message);
      throw error;
    }
  },

  // ─── USERS ────────────────────────────────────────────────────────────────
  async getUsers() {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
  },

  async saveUsers(users) {
    try {
      for (const user of users) {
        const { id, ...rest } = user;
        const isUuid = typeof id === 'string' && id.length > 20;
        const payload = isUuid ? { id, ...rest } : rest;
        const { error } = await supabase
          .from('users').upsert(payload, { onConflict: 'username' });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving users:', error.message);
      throw error;
    }
  },

  async deleteUser(username) {
    try {
      const { error } = await supabase.from('users').delete().eq('username', username);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  },

  // ─── WON PROOF ────────────────────────────────────────────────────────────
  async updateWonProof(id, url) {
    try {
      const { error } = await supabase
        .from('funnels').update({ won_proof_url: url || null }).eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating won proof:', error.message);
      throw error;
    }
  },

  // ─── MAP TO DB (camelCase → snake_case) ──────────────────────────────────
  mapToDb(f) {
    const isNum = v => v !== '' && v !== null && v !== undefined;
    return {
      name:             f.name,
      phone:            f.phone            || null,
      email:            f.email            || null,
      city_region:      f.cityRegion       || null,
      enquiry_type:     f.enquiryType      || null,
      funnel_type:      f.funnelType       || null,
      lead_source:      f.leadSource,
      next_follow_up:   f.nextFollowUp     || null,
      products:         f.products         || [],
      remarks:          f.remarks          || null,
      delivery_details: f.deliveryDetails  || null,
      payment_terms:    f.paymentTerms     || null,
      assigned_to:      f.assignedTo       || null,
      order_number:     f.orderNumber      || null,
      quote_qty:        isNum(f.quoteQty)    ? Number(f.quoteQty)    : null,
      quote_amount:     isNum(f.quoteAmount) ? Number(f.quoteAmount) : null,
      quote_desc:       f.quoteDesc        || null,
      status:           f.status           || 'Pending',
      lost_drop_reason: f.lostDropReason   || null,
      won_proof_url:    f.wonProofUrl      || null,
      is_existing:      f.isExisting       || false,
    };
  },

  // ─── MAP FROM DB (snake_case → camelCase) ────────────────────────────────
  // IMPORTANT: createdAt is kept as ISO string for reliable date math.
  // Format it at display time using formatDisplay() or toLocaleDateString().
  mapFromDb(f) {
    if (!f) return null;
    return {
      id:              f.id,
      name:            f.name,
      phone:           f.phone,
      email:           f.email,
      cityRegion:      f.city_region,
      enquiryType:     f.enquiry_type,
      funnelType:      f.funnel_type,
      leadSource:      f.lead_source,
      nextFollowUp:    f.next_follow_up,
      products:        f.products     || [],
      remarks:         f.remarks,
      deliveryDetails: f.delivery_details,
      paymentTerms:    f.payment_terms,
      orderNumber:     f.order_number,
      quoteQty:        f.quote_qty,
      quoteAmount:     f.quote_amount,
      quoteDesc:       f.quote_desc,
      status:          f.status,
      // ← ISO string preserved for date math; display with formatDisplay()
      createdAt:       f.created_at,
      createdBy:       f.created_by,
      assignedTo:      f.assigned_to  || null,
      lostDropReason:  f.lost_drop_reason || '',
      wonProofUrl:     f.won_proof_url    || '',
      isExisting:      f.is_existing      || false,
    };
  },

  // ─── BULK UPDATE ─────────────────────────────────────────────────────────────
  async bulkUpdate(ids, fields) {
    if (!ids || ids.length === 0) return;
    try {
      const updates = {};
      if (fields.status        !== undefined) updates.status           = fields.status;
      if (fields.assignedTo    !== undefined) updates.assigned_to      = fields.assignedTo || null;
      if (fields.nextFollowUp  !== undefined) updates.next_follow_up   = fields.nextFollowUp || null;
      if (fields.funnelType    !== undefined) updates.funnel_type      = fields.funnelType || null;
      if (fields.leadSource    !== undefined) updates.lead_source      = fields.leadSource;
      if (fields.lostDropReason!== undefined) updates.lost_drop_reason = fields.lostDropReason || null;
      if (Object.keys(updates).length === 0) return;
      const { error } = await supabase
        .from('funnels')
        .update(updates)
        .in('id', ids);
      if (error) throw error;
    } catch (error) {
      console.error('Error in bulkUpdate:', error.message);
      throw error;
    }
  },

  // ─── UPLOAD FILE (Base64 → Supabase Storage) ─────────────────────────────────
  async uploadProofImage(funnelId, file) {
    try {
      const ext  = file.name.split('.').pop() || 'jpg';
      const path = `proofs/${funnelId}_${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from('ekanta-proofs')
        .upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from('ekanta-proofs')
        .getPublicUrl(path);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error.message);
      throw error;
    }
  }
};
