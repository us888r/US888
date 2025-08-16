// DEMO ONLY: Play-money UI using localStorage. No payments, no wallets.
const $ = (s)=>document.querySelector(s);
const app = $("#app");

const DB = {
  get users(){return JSON.parse(localStorage.getItem("users")||"[]")},
  set users(v){localStorage.setItem("users",JSON.stringify(v))},
  get session(){return JSON.parse(localStorage.getItem("session")||"null")},
  set session(v){localStorage.setItem("session",JSON.stringify(v))},
  get history(){return JSON.parse(localStorage.getItem("history")||"[]")},
  set history(v){localStorage.setItem("history",JSON.stringify(v))}
};

function uid(){return Math.random().toString(36).slice(2,10)}
function refreshHeader(){
  const s=DB.session;
  $("#balance").textContent = s? `৳${(s.balance||0).toFixed(0)}` : "৳0";
  $("#btn-login").style.display = s? "none":"";
  $("#btn-logout").style.display = s? "":"none";
}
function setSession(u){DB.session=u; refreshHeader();}
function updateUser(u){
  DB.users = DB.users.map(x=>x.id===u.id?u:x);
  if(DB.session && DB.session.id===u.id) DB.session = u;
  refreshHeader();
}
function credit(n){const s=DB.session; if(!s)return; s.balance=(s.balance||0)+n; updateUser(s);}
function debit(n){const s=DB.session; if(!s)return false; if((s.balance||0)<n) return false; s.balance-=n; updateUser(s); return true;}
function pushHist(row){DB.history=[{id:uid(),...row},...DB.history];}

// views
function viewHome(){
  app.innerHTML = `
    <section class="card">
      <div class="h">US888 — Play-Money Demo</div>
      <p class="sub">এটি কেবল ডেমো/শিক্ষামূলক UI। বাস্তব টাকার কোন লেনদেন নেই।</p>
      <div class="notice">⚠️ Demo only. No deposits/withdrawals. ১৳ থেকে খেলুন। Signup করলে ৫০৳ বোনাস।</div>
      <div class="row" style="margin-top:10px">
        <button class="btn" onclick="viewSignup()">Signup</button>
        <button class="btn secondary" onclick="viewLogin()">Login</button>
      </div>
    </section>
  `;
}
function viewLogin(){ /* Login form */ }
function viewSignup(){ /* Signup form */ }
function pwStrength(p){return ["—","Weak","Fair","Good","Strong","Very Strong"][Math.min(5,p.length)]}
function updateStrength(){ }
function togglePass(id){ const el=document.getElementById(id); el.type=(el.type==="password"?"text":"password"); }
function doSignup(){ /* Signup logic */ }
function doLogin(){ /* Login logic */ }
function play(game, multiplier, stake){ /* Play game logic */ }
function viewHistory(){ /* Betting history */ }
function viewProfile(){ /* Profile view */ }
function saveProfile(){ /* Save profile */ }
function viewCasino(){ viewHome(); }
function viewNotices(){ /* Notices view */ }

// navbar events
document.addEventListener("click",(e)=>{
  if(e.target.id==="nav-home") viewHome();
  if(e.target.id==="nav-casino") viewCasino();
  if(e.target.id==="nav-history") viewHistory();
  if(e.target.id==="nav-profile") viewProfile();
  if(e.target.id==="nav-notice") viewNotices();
  if(e.target.id==="btn-login") viewLogin();
  if(e.target.id==="btn-logout"){ DB.session=null; refreshHeader(); viewHome(); }
});

// init
refreshHeader();
viewHome();