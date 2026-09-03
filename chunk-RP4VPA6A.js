import{I as a,M as r,bc as i}from"./chunk-DB66SVWF.js";var n=class t{constructor(e){this.supabaseService=e;this.supabase=this.supabaseService.supabase}supabase;async getAvailableSchedules(){let e=new Date().toISOString();return this.supabase.from("schedules").select(`
        *,
        subjects (id, title, image_url, description, grade_level, subject_category),
        classrooms (name, capacity, seat_layout),
        bookings (count)
      `).gt("end_booking",e).neq("bookings.status","cancelled").neq("bookings.status","rejected").neq("bookings.seat_number","ONLINE").order("start_booking",{ascending:!0})}async getAllSchedules(){return this.supabase.from("schedules").select(`
        *,
        subjects (id, title, image_url, description, grade_level, subject_category),
        classrooms (name, capacity, seat_layout),
        bookings (status)
      `).order("start_booking",{ascending:!1})}async getScheduleById(e){return this.supabase.from("schedules").select(`
        *,
        subjects (title, description, image_url, grade_level, subject_category),
        classrooms (name, capacity, seat_layout)
      `).eq("id",e).single()}async createSchedule(e){return this.supabase.from("schedules").insert(e).select().single()}async updateSchedule(e,s){return this.supabase.from("schedules").update(s).eq("id",e).select().single()}async deleteSchedule(e){return this.supabase.from("schedules").delete().eq("id",e)}async getSchedulePrerequisites(e){return this.supabase.from("schedule_prerequisites").select("prerequisite_subject_id").eq("schedule_id",e)}async saveSchedulePrerequisites(e,s){if(await this.supabase.from("schedule_prerequisites").delete().eq("schedule_id",e),!s||s.length===0)return{data:[],error:null};let o=s.map(c=>({schedule_id:e,prerequisite_subject_id:c}));return this.supabase.from("schedule_prerequisites").insert(o)}static \u0275fac=function(s){return new(s||t)(r(i))};static \u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"})};export{n as a};
