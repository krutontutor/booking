import{a as p}from"./chunk-ILRRR2LL.js";import{I as l,M as u,bc as g}from"./chunk-DB66SVWF.js";var m=class c{constructor(e,s){this.supabaseService=e;this.authService=s;this.supabase=this.supabaseService.supabase}supabase;async getBookingsBySchedule(e){return this.supabase.from("bookings").select(`
                *,
                profiles (
                    display_name,
                    username,
                    phone,
                    student_id
                )
            `).eq("schedule_id",e).neq("status","rejected")}async getMyBookings(){let e=this.authService.currentUser();return e?this.supabase.from("bookings").select(`
        *,
        schedules (
          start_booking,
          end_booking,
          subjects (title, description, image_url),
          classrooms (name)
        )
      `).eq("user_id",e.id).order("created_at",{ascending:!1}):{data:[],error:"Not logged in"}}async getBookingsByUser(e){return this.supabase.from("bookings").select(`
                *,
                schedules (
                    start_booking,
                    end_booking,
                    subjects (title, description, image_url),
                    classrooms (name)
                )
            `).eq("user_id",e).order("created_at",{ascending:!1})}async getAllBookings(){return this.supabase.from("bookings").select(`
                *,
                profiles (
                    display_name,
                    username,
                    phone,
                    student_id
                ),
                schedules (
                    start_booking,
                    end_booking,
                    subjects (title, description, image_url),
                    classrooms (name)
                )
            `).order("created_at",{ascending:!1})}async checkPrerequisiteEligibility(e,s){try{let{data:r,error:t}=await this.supabase.from("schedule_prerequisites").select("prerequisite_subject_id").eq("schedule_id",s);if(t||!r||r.length===0)return!1;let i=r.map(o=>o.prerequisite_subject_id),{data:a,error:n}=await this.supabase.from("bookings").select("status, schedules(subject_id)").eq("user_id",e).neq("status","rejected");if(n||!a)return!1;let b=a.map(o=>o.schedules?.subject_id).filter(Boolean);return i.some(o=>b.includes(o))}catch(r){return console.error("Error checking prerequisite eligibility:",r),!1}}async createBooking(e,s,r=!1){let t=this.authService.currentUser();if(!t)throw new Error("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E08\u0E2D\u0E07");let{data:i,error:a}=await this.supabase.from("schedules").select("start_booking, end_booking, subjects(title)").eq("id",e).single();if(a||!i)throw new Error("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E32\u0E23\u0E32\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19");let n=this.supabaseService.getServerNow();if(i.start_booking&&n<new Date(i.start_booking)){let d=new Date(i.start_booking).toLocaleString("th-TH",{timeZone:"Asia/Bangkok",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});throw new Error(`\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E27\u0E25\u0E32\u0E40\u0E1B\u0E34\u0E14\u0E08\u0E2D\u0E07\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E27\u0E34\u0E0A\u0E32\u0E19\u0E35\u0E49 (\u0E40\u0E1B\u0E34\u0E14\u0E08\u0E2D\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${d} \u0E19.)`)}if(i.end_booking&&n>new Date(i.end_booking))throw new Error("\u0E2B\u0E21\u0E14\u0E40\u0E27\u0E25\u0E32\u0E01\u0E32\u0E23\u0E08\u0E2D\u0E07\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E27\u0E34\u0E0A\u0E32\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27");return this.supabase.from("bookings").insert({schedule_id:e,user_id:t.id,seat_number:s,is_special_rate:r}).select().single()}async createBookingForUser(e,s,r,t=!1){return this.supabase.from("bookings").insert({schedule_id:e,user_id:r,seat_number:s,status:"confirmed",is_special_rate:t}).select().single()}async cancelBooking(e){return this.supabase.from("bookings").delete().eq("id",e)}async updateBookingStatus(e,s){return this.supabase.from("bookings").update({status:s}).eq("id",e)}subscribeToSchedule(e,s){return this.supabase.channel(`public:bookings:schedule_id=eq.${e}`).on("postgres_changes",{event:"*",schema:"public",table:"bookings",filter:`schedule_id=eq.${e}`},r=>{s()}).on("postgres_changes",{event:"*",schema:"public",table:"schedules",filter:`id=eq.${e}`},r=>{s()}).subscribe()}subscribeToMyBookings(e,s){return this.supabase.channel(`my-bookings-${e}`).on("postgres_changes",{event:"*",schema:"public",table:"bookings"},r=>{s()}).subscribe(r=>{})}static \u0275fac=function(s){return new(s||c)(u(g),u(p))};static \u0275prov=l({token:c,factory:c.\u0275fac,providedIn:"root"})};export{m as a};
