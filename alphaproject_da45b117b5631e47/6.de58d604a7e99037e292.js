(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"1zlp":function(e,t,o){"use strict";o.d(t,"a",function(){return d});var i=o("wd/R"),r=o("LRne"),s=o("eIep"),n=o("lJxs"),a=o("IzEk"),c=o("fXoL"),l=o("L7YA");let d=(()=>{class e{constructor(e){this.db=e,i.locale("it")}getAll(e,t){if(!e)return Object(r.a)(void 0);const o=this.db.col$("workout-weeks");let i=0;return this.db.colWithIds$(`users/${e}/${t}-workout`).pipe(Object(s.a)(e=>{const s=o.pipe(Object(n.a)(e=>!e||e.length<=0?[]:(e.filter(e=>e.type===t),e.filter(e=>e.weekNumber>i),e)));return!e||e.length<=0?s:(e.sort((e,t)=>e.weekNumber-t.weekNumber),e.forEach(e=>{e.completed&&(i+=1)}),i===e.length?s:(e.filter(e=>e.type===t),Object(r.a)(e)))}))}saveWeek(e,t){if(!e||!t)return;const o=this.getWeekPath(t,e);e=this.normalizeWeek(e),this.db.upsert(o,e)}isTodayCompleted(e){let t;return this.getAll(e,"functional").pipe(Object(a.a)(1),Object(s.a)(e=>{const o=Object(r.a)(!1),i=Object(r.a)(!0);if(!e||e.length<=0||!e[0])return o;e[0].week.forEach(e=>{e.selected=!1}),t=this.selectToday(e[0]);let s=!1;return t.week.forEach(e=>{e.selected&&(s=e.completed||!1)}),s?i:o}))}selectToday(e){e.week.sort((e,t)=>e.day-t.day);const t=e.createdAt?i(1e3*e.createdAt.seconds):i(),o=Math.abs(t.diff(i(),"days"));return e.week.forEach(e=>{e.completed=e.completed||!1,e.selected=!1,e.hideView=!1}),o<=0?e.week[0].selected=!0:e.week.forEach((e,t)=>{t<=o?o===t?(e.selected=!0,e.hideView=!1):(e.completed=!0,e.hideView=!0):(e.completed=e.completed||!1,e.hideView=!1)}),e}normalizeWeek(e){return e.week.forEach(e=>{var t,o,i;e.selected=!1,null===(t=e.exercises1)||void 0===t||t.forEach(e=>{e&&e.exercises.forEach(e=>{e.selected=!1})}),null===(o=e.exercises2)||void 0===o||o.forEach(e=>{e&&e.exercises.forEach(e=>{e.selected=!1})}),null===(i=e.exercises3)||void 0===i||i.forEach(e=>{e&&e.exercises.forEach(e=>{e.selected=!1})})}),e}getWeekPath(e,t){if(!e||!t)return"";let o=`users/${e}/functional-workout/`,i=t.weekNumber.toString();return 1===i.length&&(i="0"+i),o+=i,o}}return e.\u0275fac=function(t){return new(t||e)(c.Wb(l.a))},e.\u0275prov=c.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},KLmx:function(e,t,o){"use strict";o.d(t,"a",function(){return c});var i=o("fXoL"),r=o("ofXK"),s=o("3c/+");const n=function(e,t,o,i){return{hidden:e,block:t,"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95":o,"opacity-100 translate-y-0 sm:scale-100":i}};function a(e,t){if(1&e){const e=i.Tb();i.Sb(0,"div",1),i.Zb("click",function(t){return i.vc(e),i.dc().clickOut(t)}),i.Sb(1,"div",2),i.Nb(2,"iframe",3),i.ec(3,"safeUrl"),i.Rb(),i.Rb()}if(2&e){const e=i.dc();i.jc("ngClass",i.oc(4,n,!e.show&&!e.transitionStarted,e.show,!e.show,e.show)),i.Ab(2),i.jc("src",i.fc(3,2,e.videoId),i.wc)}}let c=(()=>{class e{constructor(e){this.cdRef=e,this.onShow=new i.n,this.videoId=null,this.hide=!0,this.show=!1,this.transitionStarted=!1}set id(e){e&&(this.videoId="https://www.youtube.com/embed/"+e,this.cdRef.detectChanges())}set showModal(e){if(null!=e){if(this.transitionStarted)return;!0===e&&(this.hide=!1,this.toggleModal(e))}}clickOut(e){this.toggleModal(!1)}toggleModal(e){this.transitionStarted||(this.show=e,this.transitionStarted=!0,this.onShow.emit(e),this.cdRef.detectChanges(),setTimeout(()=>{this.transitionStarted=!1,!1===e&&(this.hide=!0),this.cdRef.detectChanges()},300))}}return e.\u0275fac=function(t){return new(t||e)(i.Mb(i.h))},e.\u0275cmp=i.Gb({type:e,selectors:[["app-youtube-player"]],inputs:{id:"id",showModal:["show","showModal"]},outputs:{onShow:"onShow"},decls:1,vars:1,consts:[["style","backdrop-filter: blur(5px);","class","origin-top ease-in-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 shadow-xl transform transition-all fixed z-50 top-0 left-0 bg-black-800 bg-opacity-75 w-screen h-screen max-w-full",3,"ngClass","click",4,"ngIf"],[1,"origin-top","ease-in-out","duration-300","opacity-0","translate-y-4","sm:translate-y-0","sm:scale-95","shadow-xl","transform","transition-all","fixed","z-50","top-0","left-0","bg-black-800","bg-opacity-75","w-screen","h-screen","max-w-full",2,"backdrop-filter","blur(5px)",3,"ngClass","click"],[1,"w-11/12","max-w-full","sm:max-w-xl","h-screen","max-h-48","sm:max-h-80","rounded-md","overflow-hidden","absolute","left-1/2","top-1/2","transform","-translate-x-1/2","-translate-y-1/2"],["width","100%","height","100%","frameborder","0","allowfullscreen","","allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",3,"src"]],template:function(e,t){1&e&&i.Cc(0,a,4,9,"div",0),2&e&&i.jc("ngIf",!t.hide&&!!t.videoId)},directives:[r.m,r.k],pipes:[s.a],styles:["[_nghost-%COMP%] { display: block; }"],changeDetection:0}),e})()},"KR/6":function(e,t,o){"use strict";o.d(t,"a",function(){return l});var i=o("mrSG"),r=o("IzEk"),s=o("fXoL"),n=o("L7YA"),a=o("qfxJ"),c=o("tk/3");let l=(()=>{class e{constructor(e,t,o){this.db=e,this.vimeoService=t,this.http=o}upsert(e){return Object(i.a)(this,void 0,void 0,function*(){const t="Le informazioni inserite non sono corrette. Controllare di aver inserito un link valido.";if(!e||!e.link)throw new Error(t);const o=e.id?e.id:this.db.generateId();e.id=o;const i=this.getSource(e.link);if(!i||!i.source||!i.videoId)throw new Error(t);e.source=i.source,e.videoId=i.videoId,"YouTube"===i.source&&(e.thumbnail=`https://img.youtube.com/vi/${e.videoId}/0.jpg`);try{return"YouTube"===i.source?e.title=yield this.getYtTitle(e.videoId):"Vimeo"===i.source&&(e=yield this.setVimeoInfo(e)),void(yield this.db.upsert(`videos/${o}`,e))}catch(r){throw new Error(t)}})}getAll(e){return e?this.db.col$("videos",e=>e.orderBy("updatedAt","desc")):this.db.col$("videos")}delete(e){return this.db.delete(`videos/${e}`)}getSource(e){const t=e.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/),o=e.includes("vimeo")&&e.split("/")[3];let i=null;return t&&t[1]?i={source:"YouTube",videoId:t[1]}:o&&parseInt(o)&&(i={source:"Vimeo",videoId:parseInt(o)}),i}getYtTitle(e){return Object(i.a)(this,void 0,void 0,function*(){const t=`https://www.googleapis.com/youtube/v3/videos?id=${e}&key=AIzaSyAJnMQGGX7iDQLI8QS5RTvn0nyhGLDfmhA&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`,o=yield this.http.get(t).pipe(Object(r.a)(1)).toPromise();if(!o||o.items.length<=0||!o.items[0].snippet.title)throw new Error("");return o.items[0].snippet.title})}setVimeoInfo(e){var t;return Object(i.a)(this,void 0,void 0,function*(){const o=null===(t=e.link)||void 0===t?void 0:t.split("/")[3];if(!o)return e;const i=yield this.vimeoService.getVideo(parseInt(o));if(i instanceof Error||!i)throw i;const r=i.pictures.sizes.filter(e=>e.width>=640&&e.width<=1280);return e?(e.thumbnail=r[0].link,e.title=i.name,e):e})}}return e.\u0275fac=function(t){return new(t||e)(s.Wb(n.a),s.Wb(a.a),s.Wb(c.b))},e.\u0275prov=s.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},hyrI:function(e,t,o){"use strict";o.d(t,"a",function(){return C});var i=o("eIep"),r=o("lJxs"),s=o("fXoL"),n=o("lyTB"),a=o("L7YA"),c=o("ofXK");function l(e,t){1&e&&(s.Sb(0,"span"),s.Ec(1,"Benvenuto"),s.Rb())}function d(e,t){1&e&&(s.Sb(0,"span"),s.Ec(1,"Bentornato"),s.Rb())}function u(e,t){if(1&e&&(s.Sb(0,"span",7),s.Ec(1),s.Rb()),2&e){const e=s.dc();s.Ab(1),s.Gc(" ",e.user.name.split(" ")[0],"")}}let b=(()=>{class e{constructor(e){this.db=e,this.justUpdatedLogin=!1}set setUser(e){var t;e&&(this.user=e,this.justUpdatedLogin||(this.firstLogin=null===(t=e.details)||void 0===t?void 0:t.firstLogin,e.details&&e.details.firstLogin&&(e.details.firstLogin=!1,this.justUpdatedLogin=!0,this.db.upsert(`users/${e.id}`,e.details))))}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(s.Mb(a.a))},e.\u0275cmp=s.Gb({type:e,selectors:[["app-welcome-banner"]],inputs:{setUser:["user","setUser"]},decls:10,vars:3,consts:[[1,"bg-black-800","w-full","rounded-md","relative","overflow-hidden","px-4","sm:px-6","lg:px-8","py-12","md:py-10","lg:py-16","xl:py-24","shadow-2xl"],["src","assets/images/workout-hero-bg.jpg",1,"object-cover","absolute","z-10","top-0","left-0","w-full","h-full"],[1,"absolute","z-20","left-0","top-0","bg-black-900","bg-opacity-70","w-full","h-full"],[1,"relative","z-30","w-full","max-w-full"],[1,"text-4xl","tracking-tight","font-extrabold","whitespace-normal","text-gray-100","sm:text-5xl","md:text-6xl"],[4,"ngIf"],["class","text-indigo-500",4,"ngIf"],[1,"text-indigo-500"]],template:function(e,t){1&e&&(s.Sb(0,"div",0),s.Nb(1,"img",1),s.Nb(2,"div",2),s.Sb(3,"div",3),s.Sb(4,"h1",4),s.Cc(5,l,2,0,"span",5),s.Cc(6,d,2,0,"span",5),s.Cc(7,u,2,1,"span",6),s.Rb(),s.Sb(8,"p"),s.Ec(9,"Esplora la piattaforma pi\xf9 completa per Workout efficaci."),s.Rb(),s.Rb(),s.Rb()),2&e&&(s.Ab(5),s.jc("ngIf",t.firstLogin),s.Ab(1),s.jc("ngIf",!t.firstLogin),s.Ab(1),s.jc("ngIf",t.user&&t.user.name))},directives:[c.m],encapsulation:2,changeDetection:0}),e})();var h=o("XNiG"),p=o("1G5W"),f=o("1zlp"),m=o("tyNb"),g=o("n45d");function w(e,t){1&e&&(s.Qb(0),s.Sb(1,"h2",4),s.Ec(2,"Non dimenticarti di completare l'allenamento di oggi!"),s.Rb(),s.Sb(3,"h3",5),s.Ec(4,"Non dimenticarti di completare l'allenamento di oggi!"),s.Rb(),s.Sb(5,"button",6),s.Ec(6," Completa il Workout "),s.Nb(7,"i-bs",7),s.Rb(),s.Pb())}function v(e,t){1&e&&(s.Qb(0),s.Sb(1,"h2",4),s.Ec(2,"Congratulazioni! Hai completato l'allenamento di oggi."),s.Nb(3,"br"),s.Nb(4,"br"),s.Ec(5,"Goditi il meritato riposo \ud83c\udf89"),s.Rb(),s.Sb(6,"h3",5),s.Ec(7,"Congratulazioni! Hai completato l'allenamento di oggi."),s.Nb(8,"br"),s.Nb(9,"br"),s.Ec(10,"Goditi il meritato riposo \ud83c\udf89"),s.Rb(),s.Pb())}const y=function(e,t){return{"text-yellow-400":e,"text-green-400":t}};let x=(()=>{class e{constructor(e,t,o){this.userWeekService=e,this.authService=t,this.cdRef=o,this.workoutCompleted=!1,this.destroyed$=new h.a}ngOnInit(){this.authService.user$.pipe(Object(p.a)(this.destroyed$)).subscribe(e=>{e&&e.id&&this.userWeekService.isTodayCompleted(e.id).pipe(Object(p.a)(this.destroyed$)).subscribe(e=>{this.workoutCompleted=e,this.cdRef.detectChanges()})})}ngOnDestroy(){this.destroyed$.next(!0)}}return e.\u0275fac=function(t){return new(t||e)(s.Mb(f.a),s.Mb(n.a),s.Mb(s.h))},e.\u0275cmp=s.Gb({type:e,selectors:[["app-workout-banner"]],decls:6,vars:6,consts:[[1,"bg-black-800","rounded-md","h-full","px-4","sm:px-6","lg:px-8","py-6","relative"],[1,"md:w-10/12","md:absolute","md:left-1/2","md:top-1/2","md:transform","md:-translate-x-1/2","md:-translate-y-1/2"],[3,"ngClass"],[4,"ngIf"],[1,"hidden","md:block"],[1,"block","md:hidden","text-gray-200"],["routerLink","/dashboard/workout/functional",1,"btn","success","mt-4","inline-flex","items-center"],["name","arrowRightShort",1,"ml-1"]],template:function(e,t){1&e&&(s.Sb(0,"div",0),s.Sb(1,"div",1),s.Sb(2,"h6",2),s.Ec(3,"Workout Funzionale"),s.Rb(),s.Cc(4,w,8,0,"ng-container",3),s.Cc(5,v,11,0,"ng-container",3),s.Rb(),s.Rb()),2&e&&(s.Ab(2),s.jc("ngClass",s.mc(3,y,!t.workoutCompleted,t.workoutCompleted)),s.Ab(2),s.jc("ngIf",!t.workoutCompleted),s.Ab(1),s.jc("ngIf",t.workoutCompleted))},directives:[c.k,c.m,m.h,g.a],encapsulation:2,changeDetection:0}),e})();var k=o("KR/6"),S=o("5IWm"),I=o("KLmx");const R=function(e){return{"transform scale-175":e}};function j(e,t){if(1&e){const e=s.Tb();s.Qb(0),s.Sb(1,"div",13),s.Zb("click",function(){s.vc(e);const o=t.$implicit;return s.dc().togglePlayer(o.source,"YouTube"===o.source?o.videoId:o.link)}),s.Nb(2,"div",14),s.Nb(3,"div",15),s.Sb(4,"div",16),s.Nb(5,"i-bs",17),s.Nb(6,"i-bs",18),s.Rb(),s.Sb(7,"div",19),s.Sb(8,"div",20),s.Sb(9,"p",21),s.Ec(10),s.Rb(),s.Rb(),s.Rb(),s.Rb(),s.Pb()}if(2&e){const e=t.$implicit;s.Ab(2),s.Ac("background: url('",e.thumbnail,"')"),s.jc("ngClass",s.lc(5,R,"YouTube"===e.source)),s.Ab(8),s.Fc(e.title)}}let E=(()=>{class e{constructor(e,t){this.videoService=e,this.cdRef=t,this.destroyed$=new h.a,this.placeholderImage="/assets/images/AL_temp-logo.jpg",this.playerUrl="",this.playerId="",this.showVimeoPlayer=!1,this.showYoutubePlayer=!1}ngOnInit(){this.videoService.getAll(!0).pipe(Object(p.a)(this.destroyed$)).subscribe(e=>{this.savedVideos=[],e.forEach((e,t)=>{"private"===e.status||t>1||this.savedVideos.push(e)}),this.cdRef.detectChanges()})}ngOnDestroy(){this.destroyed$.next(!0)}toggleVimeoPlayer(e){e&&(this.playerUrl=e,this.showVimeoPlayer=!0)}toggleYoutubePlayer(e){e&&(this.playerId=e,this.showYoutubePlayer=!0)}togglePlayer(e,t){t&&e&&("YouTube"===e?this.toggleYoutubePlayer(t+""):"Vimeo"===e&&this.toggleVimeoPlayer(t))}onShowVimeoPlayer(e){this.showVimeoPlayer=e}onShowYoutubePlayer(e){this.showYoutubePlayer=e}}return e.\u0275fac=function(t){return new(t||e)(s.Mb(k.a),s.Mb(s.h))},e.\u0275cmp=s.Gb({type:e,selectors:[["app-video-banner"]],decls:18,vars:5,consts:[[1,"w-full","py-4","max-w-full"],[1,"flex","flex-row","justify-between","items-center","mb-1"],[1,"text-gray-200","font-bold"],[1,"overflow-x-auto","max-w-full"],[1,"flex","flex-row","w-max","justify-between","items-center","pt-1","pb-3","sm:pb-1","px-1","pr-2","mt-4","space-x-8"],[4,"ngFor","ngForOf"],["routerLink","/dashboard/video",1,"bg-black-800","group","w-screen","max-w-xs","sm:max-w-sm","h-40","sm:h-56","relative","cursor-pointer","rounded-md","shadow-xl","overflow-hidden","ring","ring-offset-black-900","ring-indigo-500"],[1,"w-10/12","absolute","left-1/2","top-1/2","transform","-translate-x-1/2","-translate-y-1/2"],[1,"text-gray-200"],["routerLink","/dashboard/video",1,"btn","primary","inline-flex","items-center","mt-4","group-hover:bg-indigo-500"],["name","arrowRightShort",1,"ml-1"],[3,"show","url","onShow"],[3,"show","id","onShow"],[1,"w-screen","max-w-xs","sm:max-w-sm","h-40","sm:h-56","group","relative","cursor-pointer","rounded-md","shadow-xl","bg-cover","bg-center","bg-no-repeat","overflow-hidden","hover:ring","hover:ring-offset-black-900","hover:ring-indigo-500",3,"click"],[1,"absolute","top-0","left-0","w-full","h-full","bg-cover","bg-center","bg-no-repeat",3,"ngClass"],[1,"absolute","top-0","left-0","w-full","h-full","bg-gray-800","bg-opacity-70",2,"backdrop-filter","blur(1.5px)"],[1,"absolute","-mt-4","md:-mt-5","top-1/2","left-1/2","transform","-translate-x-1/2","-translate-y-1/2"],["name","playCircleFill","width","3rem","height","3rem",1,"hidden","sm:block","text-gray-300","group-hover:text-gray-50"],["name","playCircleFill","width","2rem","height","2rem",1,"block","sm:hidden","text-gray-300","group-hover:text-gray-50"],[1,"w-full","max-w-full","h-10","sm:h-12","flex","flex-row","items-center","overflow-hidden","px-4","absolute","bottom-0","bg-black-900","bg-opacity-70",2,"backdrop-filter","blur(8px)"],[1,"w-full","max-w-full","overflow-hidden"],[1,"text-sm","sm:text-base","text-gray-300","group-hover:text-gray-50","font-bold","truncate"]],template:function(e,t){1&e&&(s.Sb(0,"div",0),s.Sb(1,"div",1),s.Sb(2,"h4",2),s.Ec(3,"Le ultime live"),s.Rb(),s.Rb(),s.Sb(4,"div",3),s.Sb(5,"div",4),s.Cc(6,j,11,7,"ng-container",5),s.Sb(7,"div",6),s.Sb(8,"div",7),s.Sb(9,"h5",8),s.Ec(10,"Vuoi vedere tutti i video?"),s.Rb(),s.Sb(11,"p"),s.Ec(12,"Clicca sul seguente pulsante e non perderti neanche una nostra diretta!"),s.Rb(),s.Sb(13,"button",9),s.Ec(14," Mostra tutti "),s.Nb(15,"i-bs",10),s.Rb(),s.Rb(),s.Rb(),s.Rb(),s.Rb(),s.Rb(),s.Sb(16,"app-vimeo-player",11),s.Zb("onShow",function(e){return t.onShowVimeoPlayer(e)}),s.Rb(),s.Sb(17,"app-youtube-player",12),s.Zb("onShow",function(e){return t.onShowYoutubePlayer(e)}),s.Rb()),2&e&&(s.Ab(6),s.jc("ngForOf",t.savedVideos),s.Ab(10),s.jc("show",t.showVimeoPlayer)("url",t.playerUrl),s.Ab(1),s.jc("show",t.showYoutubePlayer)("id",t.playerId))},directives:[c.l,m.h,g.a,S.a,I.a,c.k],encapsulation:2,changeDetection:0}),e})(),C=(()=>{class e{constructor(e){this.authService=e,this.pageTitle="Dashboard"}ngOnInit(){this.user$=this.authService.fireUser$.pipe(Object(i.a)(e=>e?this.authService.user$.pipe(Object(r.a)(t=>(t&&(t.id=e.uid),t))):this.authService.user$))}}return e.\u0275fac=function(t){return new(t||e)(s.Mb(n.a))},e.\u0275cmp=s.Gb({type:e,selectors:[["ng-component"]],decls:5,vars:3,consts:[[1,"grid","grid-cols-1","gap-8","md:grid-cols-2","w-full"],[3,"user"],[1,"md:col-span-2"]],template:function(e,t){1&e&&(s.Sb(0,"div",0),s.Nb(1,"app-welcome-banner",1),s.ec(2,"async"),s.Nb(3,"app-workout-banner"),s.Nb(4,"app-video-banner",2),s.Rb()),2&e&&(s.Ab(1),s.jc("user",s.fc(2,1,t.user$)))},directives:[b,x,E],pipes:[c.b],encapsulation:2,changeDetection:0}),e})()},qfxJ:function(e,t,o){"use strict";o.d(t,"a",function(){return n});var i=o("mrSG"),r=o("Jgta"),s=o("fXoL");let n=(()=>{class e{constructor(){this.firebaseFunctions=r.a.app().functions("europe-west2"),this.vimeoReq=this.firebaseFunctions.httpsCallable("vimeoRequest")}getVideo(e){return Object(i.a)(this,void 0,void 0,function*(){if(!e)return new Error("Video id is not defined.");const t={method:"GET",path:`/videos/${e}`},{data:o}=yield this.vimeoReq(t);return o.err?new Error(o.err):o.body})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=s.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);