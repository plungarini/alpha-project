(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"/5gU":function(e,t,s){"use strict";s.d(t,"a",function(){return N});var n=s("wd/R"),i=s("fXoL"),r=s("2Pii"),a=s("3Pt+"),o=s("XNiG"),l=s("1G5W"),c=s("fbMX"),d=s("dG+U"),m=s("PT0D"),u=s("n45d"),b=s("ofXK");function g(e,t){if(1&e){const e=i.Tb();i.Sb(0,"img",38),i.Zb("click",function(){i.vc(e);const s=t.$implicit;return i.dc(2).selectImage(s)}),i.Rb()}2&e&&i.jc("src",t.$implicit,i.xc)}function f(e,t){if(1&e&&(i.Qb(0),i.Sb(1,"div",36),i.Cc(2,g,1,1,"img",37),i.Rb(),i.Pb()),2&e){const e=i.dc();i.Ab(2),i.jc("ngForOf",e.images)}}function h(e,t){1&e&&(i.Sb(0,"div",39),i.Sb(1,"p",40),i.Ec(2," Nessuna immagine dal server,"),i.Nb(3,"br"),i.Ec(4," aggiungine una dal computer. "),i.Rb(),i.Rb())}const p=function(e,t,s,n){return{img:e,fullName:t,email:s,color:n}};let v=(()=>{class e{constructor(e,t){this.storageService=e,this.cdRef=t,this.sendMessage=new i.n,this.formValueChanged=new i.n,this.sender={img:"assets/icons/no-user-ph.png",fullName:"",email:"",color:"indigo"},this.form=new a.h({senderImg:new a.e("assets/icons/no-user-ph.png"),senderName:new a.e(""),senderMessage:new a.e(""),senderLink:new a.e(""),senderDate:new a.e(""),senderTime:new a.e("")}),this.images=new Set,this.mediaFolderPath="admins/news/sender/images",this.destroyed$=new o.a}set resetForm(e){void 0!==e&&this.form.patchValue({senderImg:"assets/icons/no-user-ph.png",senderName:"",senderMessage:"",senderLink:"",senderDate:"",senderTime:""})}ngOnInit(){this.getAllImages(),this.todayDate=n().format("YYYY-MM-DD"),this.form.valueChanges.pipe(Object(l.a)(this.destroyed$)).subscribe(e=>{if(!e)return;const t=this.setSendAtDate();this.formValueChanged.emit(t)})}selectImage(e){this.sender.img=e||"assets/icons/no-user-ph.png",e&&(this.images.add(e),this.form.patchValue({senderImg:e})),this.cdRef.detectChanges()}uploadImage(e){if(!e)return;const t=e.files[0],{downloadUrl$:s}=this.storageService.uploadFileAndGetMetadata(this.mediaFolderPath,t);s.pipe(Object(l.a)(this.destroyed$)).subscribe(e=>{e&&this.selectImage(e)})}getAllImages(){this.storageService.getFileReference(this.mediaFolderPath).listAll().pipe(Object(l.a)(this.destroyed$)).subscribe(e=>{this.images.clear(),e.items.forEach(e=>{e.getDownloadURL().then(e=>{this.images.add(e)})}),this.cdRef.detectChanges()})}saveAnnounce(){const e=this.setSendAtDate();this.sendMessage.emit(e)}setSendAtDate(){const e=this.form.value,t=n((e.senderDate||"")+" "+(e.senderTime||"")).unix();return{senderImg:e.senderImg,senderName:e.senderName,senderMessage:e.senderMessage,senderLink:e.senderLink,sendAt:t?new Date(1e3*t):new Date,sendTo:[]}}}return e.\u0275fac=function(t){return new(t||e)(i.Mb(c.a),i.Mb(i.h))},e.\u0275cmp=i.Gb({type:e,selectors:[["app-admin-news-form"]],inputs:{resetForm:"resetForm"},outputs:{sendMessage:"sendMessage",formValueChanged:"formValueChanged"},decls:48,vars:13,consts:[["for","senderName",1,"block","font-medium"],["type","file","accept","image/png, image/jpeg",1,"hidden",3,"change"],["profilePicture",""],[1,"w-full",3,"formGroup","ngSubmit"],[1,"grid","grid-cols-6","gap-4","mt-1"],["menuPosition","v-bottom-left",3,"customOptions","closeOnOptionClick"],[1,"trigger"],[1,"group","relative"],["displayType","img",1,"col-span-1",3,"user","enableProfileLink"],[1,"absolute","left-0","top-0","opacity-0","group-hover:opacity-100","cursor-pointer","text-gray-100","flex","items-center","w-full","h-full","rounded-full","overflow-hidden","bg-black-900","bg-opacity-60"],["name","pencilSquare","width","1.2rem","height","1.2rem",1,"block","mx-auto"],[1,"custom-options","w-64"],[1,"bg-black-900","shadow-2xl","py-2","px-4","rounded-md"],[1,"pb-2","mb-2","border-b","border-gray-700","text-gray-200","font-medium"],[1,"bg-black-800","mb-2","hover:bg-black-700","hover:text-gray-200","rounded","cursor-pointer","text-center","py-1","px-2",3,"click"],[1,"inline-flex","items-center"],["name","plusCircleFill",1,"mr-2"],[4,"ngIf"],["class","h-32 w-full flex items-center",4,"ngIf"],[1,"col-span-5"],["type","text","id","senderName","name","senderName","formControlName","senderName","placeholder","Inserisci qui il nome",1,"appearance-none","block","w-full","pr-10","mt-.5","focus:outline-none","sm:text-sm","rounded-md","bg-black-800"],[1,"mt-4"],["for","senderMessage",1,"block","font-medium"],["rows","8","id","senderMessage","name","senderMessage","formControlName","senderMessage",1,"appearance-none","block","w-full","pr-10","mt-1","focus:outline-none","sm:text-sm","rounded-md","bg-black-800"],["for","senderLink",1,"block","font-medium"],["type","text","id","senderLink","name","senderLink","formControlName","senderLink","placeholder","https://www.google.it/",1,"appearance-none","block","w-full","pr-10","mt-1","focus:outline-none","sm:text-sm","rounded-md","bg-black-800"],["for","senderDate",1,"block","font-medium","mb-1"],[1,"text-sm","text-gray-500"],[1,"grid","grid-cols-1","sm:grid-cols-2","gap-4"],["for","senderDate",1,"text-gray-700"],["id","senderDate","name","senderDate","type","date","formControlName","senderDate",1,"placeholder-gray-400","text-gray-400","text-center","block","w-full","pr-10","mt-1","focus:outline-none","sm:text-sm","rounded-md","bg-black-800",3,"min"],["for","senderTime",1,"text-gray-700"],["id","senderTime","name","senderTime","type","time","formControlName","senderTime",1,"placeholder-gray-400","text-gray-400","text-center","block","w-full","pr-10","mt-1","focus:outline-none","sm:text-sm","rounded-md","bg-black-800"],[1,"text-xs","text-center","text-yellow-400","w-72","mt-4","mx-auto"],[1,"w-full","fixed","bottom-4","left-0","shadow-2xl","px-6","z-10","sm:bottom-0","sm:mt-4","sm:px-0","sm:shadow-none","sm:relative"],["type","submit",1,"btn","success","inline-flex","items-center","w-full"],[1,"grid","grid-cols-4","gap-4","my-4","max-h-32","place-items-center","overflow-auto"],["class","object-cover w-10 h-10 rounded-full overflow-hidden",3,"src","click",4,"ngFor","ngForOf"],[1,"object-cover","w-10","h-10","rounded-full","overflow-hidden",3,"src","click"],[1,"h-32","w-full","flex","items-center"],[1,"block","w-full","text-xs","text-center"]],template:function(e,t){if(1&e){const e=i.Tb();i.Sb(0,"label",0),i.Ec(1,"Seleziona il mittente:"),i.Rb(),i.Sb(2,"input",1,2),i.Zb("change",function(e){return t.uploadImage(e.target)}),i.Rb(),i.Sb(4,"form",3),i.Zb("ngSubmit",function(){return t.saveAnnounce()}),i.Sb(5,"div",4),i.Sb(6,"app-dropdown",5),i.Sb(7,"div",6),i.Sb(8,"div",7),i.Nb(9,"app-avatar",8),i.Sb(10,"div",9),i.Nb(11,"i-bs",10),i.Rb(),i.Rb(),i.Rb(),i.Sb(12,"div",11),i.Sb(13,"div",12),i.Sb(14,"p",13),i.Ec(15,"Seleziona un'immagine:"),i.Rb(),i.Sb(16,"div",14),i.Zb("click",function(){return i.vc(e),i.tc(3).click()}),i.Sb(17,"div",15),i.Nb(18,"i-bs",16),i.Ec(19," Aggiungi un'immagine "),i.Rb(),i.Rb(),i.Cc(20,f,3,1,"ng-container",17),i.Cc(21,h,5,0,"div",18),i.Rb(),i.Rb(),i.Rb(),i.Sb(22,"div",19),i.Nb(23,"input",20),i.Rb(),i.Rb(),i.Sb(24,"div",21),i.Sb(25,"label",22),i.Ec(26,"Scrivi il messaggio:"),i.Rb(),i.Nb(27,"textarea",23),i.Rb(),i.Sb(28,"div",21),i.Sb(29,"label",24),i.Ec(30,"Inserisci un link: (Opzionale)"),i.Rb(),i.Nb(31,"input",25),i.Rb(),i.Sb(32,"div",21),i.Sb(33,"label",26),i.Ec(34," Programma l'annuncio: (Opzionale)"),i.Nb(35,"br"),i.Sb(36,"span",27),i.Ec(37,"Lascia vuoto per far partire subito l'annuncio."),i.Rb(),i.Rb(),i.Sb(38,"div",28),i.Sb(39,"label",29),i.Nb(40,"input",30),i.Rb(),i.Sb(41,"label",31),i.Nb(42,"input",32),i.Rb(),i.Rb(),i.Sb(43,"p",33),i.Ec(44,"* Assicurati che data e orario siano nel futuro, o l'annuncio partir\xe0 immediatamente."),i.Rb(),i.Rb(),i.Sb(45,"div",34),i.Sb(46,"button",35),i.Ec(47," Salva l'annuncio "),i.Rb(),i.Rb(),i.Rb()}2&e&&(i.Ab(4),i.jc("formGroup",t.form),i.Ab(2),i.jc("customOptions",!0)("closeOnOptionClick",!0),i.Ab(3),i.jc("user",i.oc(8,p,t.sender.img,t.sender.fullName,t.sender.email,t.sender.color))("enableProfileLink",!1),i.Ab(11),i.jc("ngIf",t.images.size>0),i.Ab(1),i.jc("ngIf",t.images.size<=0),i.Ab(19),i.jc("min",t.todayDate))},directives:[a.s,a.m,a.i,d.a,m.a,u.a,b.m,a.b,a.l,a.g,b.l],styles:['input[type="time"][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n      filter: invert(0.7);\n    }\n    input[type="date"][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n      filter: invert(0.7);\n    }'],changeDetection:0}),e})();var w=s("TVmF");function x(e,t){1&e&&i.Nb(0,"i-bs",16)}function S(e,t){1&e&&i.Nb(0,"i-bs",17)}function R(e,t){if(1&e){const e=i.Tb();i.Qb(0),i.Sb(1,"li",18),i.Sb(2,"div",19),i.Zb("click",function(){i.vc(e);const s=t.$implicit;return i.dc().selectUser(s.id)}),i.Sb(3,"div",20),i.Nb(4,"app-avatar",21),i.Rb(),i.Sb(5,"div",22),i.Sb(6,"div",23),i.Ec(7),i.Rb(),i.Sb(8,"div",24),i.Ec(9),i.Rb(),i.Rb(),i.Sb(10,"div",25),i.Sb(11,"div",26),i.Nb(12,"input",27),i.Rb(),i.Rb(),i.Rb(),i.Rb(),i.Pb()}if(2&e){const e=t.$implicit,s=i.dc();i.Ab(4),i.jc("user",s.getAvatarInfo(e))("enableProfileLink",!1),i.Ab(3),i.Gc(" ",e.name||e.email," "),i.Ab(2),i.Gc(" ",e.name?e.email:e.roles.admin?"Admin":"Utente"," "),i.Ab(3),i.jc("checked",e.selected)}}let k=(()=>{class e{constructor(e,t){this.userService=e,this.cdRef=t,this.selectedUsers=new i.n,this.users=[],this.searchInput=new a.e,this.allSelected=!1,this.destroyed$=new o.a}set resetForm(e){void 0!==e&&(this.users=this.users.map(e=>Object.assign(Object.assign({},e),{selected:!1})),this.filteredUsers=this.users,this.selectedUsers.emit(this.users))}ngOnInit(){this.userService.getAll().pipe(Object(l.a)(this.destroyed$)).subscribe(e=>{if(!e)return;const t=e.sort((e,t)=>e.name>t.name?1:-1);this.users=t.map(e=>Object.assign(Object.assign({},e),{selected:!1})),this.selectedUsers.emit(this.users),this.filteredUsers||(this.filteredUsers=this.users),this.cdRef.detectChanges()}),this.searchInput.valueChanges.pipe(Object(l.a)(this.destroyed$)).subscribe(e=>{this.filteredUsers=e?this.filterUsers(e):this.users})}ngOnDestroy(){this.destroyed$.next(!0)}selectUser(e){e&&(this.users.forEach(t=>{t.id===e&&(t.selected=!t.selected)}),this.allSelected=!0,this.users.forEach(e=>{e.selected||(this.allSelected=!1)}),this.filterUsers(),this.updateSelectedUsers())}selectAllUsers(){this.users.map(e=>{e.selected=!this.allSelected}),this.allSelected=!this.allSelected,this.filterUsers(),this.users.sort((e,t)=>e.name>t.name?1:-1),this.updateSelectedUsers()}updateSelectedUsers(){this.selectedUsers.emit(this.users)}getAvatarInfo(e){var t,s;return{img:(null===(t=e.details)||void 0===t?void 0:t.imgUrl)||"",fullName:e.name||"",email:e.email,color:(null===(s=e.details)||void 0===s?void 0:s.imgColorBg)||"indigo"}}filterUsers(e){const t=(e||"").toLowerCase();let s=this.users.sort((e,t)=>e.name>t.name?1:-1);const n=s.filter(e=>{const s=e.name.toLowerCase(),n=e.email.toLowerCase(),i=e.roles.admin?"admin":e.roles.editor?"editor":"";return s.includes(t)||n.includes(t)||i.includes(t)});return s=s.sort((e,t)=>e.selected===t.selected?0:e.selected?-1:1),e?n:s}}return e.\u0275fac=function(t){return new(t||e)(i.Mb(w.a),i.Mb(i.h))},e.\u0275cmp=i.Gb({type:e,selectors:[["app-admin-news-users"]],inputs:{resetForm:"resetForm"},outputs:{selectedUsers:"selectedUsers"},decls:21,vars:6,consts:[[1,"w-full","max-w-full"],[1,"w-full","max-w-full","mb-4"],["for","searchUser",1,"block","font-medium"],[1,"mt-1","flex","rounded-md","shadow-sm"],[1,"relative","flex","items-stretch","flex-grow","focus-within:z-10"],[1,"absolute","inset-y-0","left-0","pl-3","flex","items-center","pointer-events-none"],["name","peopleFill","width","1.2rem","height","1.2rem"],["type","text","name","searchUser","id","searchUser","autocomplete","new-password",1,"focus:ring-indigo-500","focus:border-indigo-500","block","w-full","rounded-none","rounded-l-md","pl-10","sm:text-sm","border-gray-500","text-gray-300","bg-black-800",3,"formControl","placeholder"],[1,"-ml-px","relative","inline-flex","items-center","space-x-2","px-4","py-2","border","border-gray-500","text-sm","font-medium","rounded-r-md","text-gray-300","bg-black-700","hover:bg-black-600","focus:outline-none","focus:ring-1","focus:ring-indigo-500","focus:border-indigo-500"],["name","funnelFill","width","1.2rem","height","1.2rem"],[1,"flex","flex-col","w-full","max-w-full"],[1,"btn","primary","w-full","inline-flex","items-center","mb-2",3,"click"],["name","circle","class","mr-2","style","margin-bottom: -2px; transform: translateY(-2px)",4,"ngIf"],["name","check2Circle","class","mr-2 text-green-400","width","1.2rem","height","1.2rem","style","margin-bottom: -2px; transform: translateY(-2px)",4,"ngIf"],[1,"user-container","overflow-auto",2,"max-height","30rem"],[4,"ngFor","ngForOf"],["name","circle",1,"mr-2",2,"margin-bottom","-2px","transform","translateY(-2px)"],["name","check2Circle","width","1.2rem","height","1.2rem",1,"mr-2","text-green-400",2,"margin-bottom","-2px","transform","translateY(-2px)"],[1,"flex","flex-row","mb-2","justify-start","w-full","max-w-full"],[1,"bg-black-700","hover:bg-gray-700","border","border-gray-700","hover:border-gray-500","hover:shadow-xl","transition","duration-500","shadow","ease-in-out","select-none","cursor-pointer","rounded-md","flex","flex-1","items-center","p-4","w-full",2,"min-height","80px",3,"click"],[1,"flex","flex-col","w-10","h-10","items-center","mr-4"],["displayType","img",3,"user","enableProfileLink"],[1,"flex-1","pl-1","md:mr-16"],[1,"font-medium","dark:text-white"],[1,"text-sm"],[1,"relative","flex","items-start"],[1,"flex","items-center","h-5"],["type","checkbox",1,"checked:ring-indigo-500","h-4","w-4","text-indigo-600","border-gray-700","bg-black-800","rounded",3,"checked"]],template:function(e,t){1&e&&(i.Sb(0,"div",0),i.Sb(1,"div",1),i.Sb(2,"label",2),i.Ec(3,"Seleziona il destinatario:"),i.Rb(),i.Sb(4,"div",3),i.Sb(5,"div",4),i.Sb(6,"div",5),i.Nb(7,"i-bs",6),i.Rb(),i.Nb(8,"input",7),i.Rb(),i.Sb(9,"button",8),i.Nb(10,"i-bs",9),i.Sb(11,"span"),i.Ec(12,"Filtra"),i.Rb(),i.Rb(),i.Rb(),i.Rb(),i.Sb(13,"ul",10),i.Sb(14,"li",11),i.Zb("click",function(){return t.selectAllUsers()}),i.Cc(15,x,1,0,"i-bs",12),i.Cc(16,S,1,0,"i-bs",13),i.Ec(17),i.Rb(),i.Rb(),i.Sb(18,"div",14),i.Sb(19,"ul",10),i.Cc(20,R,13,5,"ng-container",15),i.Rb(),i.Rb(),i.Rb()),2&e&&(i.Ab(8),i.jc("formControl",t.searchInput)("placeholder","Cerca fra "+(t.users?t.users.length:0)+" utenti"),i.Ab(7),i.jc("ngIf",!t.allSelected),i.Ab(1),i.jc("ngIf",t.allSelected),i.Ab(1),i.Gc(" ",t.allSelected?"Deseleziona tutti":"Seleziona tutti"," "),i.Ab(3),i.jc("ngForOf",t.filteredUsers))},directives:[u.a,a.b,a.l,a.f,b.m,b.l,m.a],encapsulation:2,changeDetection:0}),e})();var y=s("vfO+"),A=s("FYjP");function M(e,t){if(1&e&&(i.Sb(0,"p",12),i.Ec(1),i.Rb()),2&e){const e=t.ngIf;i.Ab(1),i.Hc(" Questo messaggio verr\xe0 inviato a ",e," ",1===e?"utente":"utenti",". ")}}function I(e,t){1&e&&(i.Sb(0,"p",12),i.Ec(1," Questo messaggio verr\xe0 inviato a 0 utenti. "),i.Rb())}let N=(()=>{class e{constructor(e,t){this.cdRef=e,this.userNotification=t,this.pageTitle="Invia un annuncio",this.pageDesc="Crea un annuncio che puoi indirizzare ad una lista di utenti o a tutti.",this.errorMessage="",this.successMessage="",this.timersDiff=[],this.resetForm=void 0}ngOnInit(){n.locale("it"),this.setAnnouncementPreview()}updateSelectedUsers(e){e&&(this.selectedUsers=e,this.announcement.sendTo=e.filter(e=>e.selected))}sendMessage(e){e&&(e.sendTo=this.selectedUsers.filter(e=>e.selected)),(e=this.validateMessage(e))&&!this.errorMessage&&this.userNotification.add(e).then(()=>{this.successMessage="Annuncio salvato correttamente",this.resetForm=!this.resetForm,setTimeout(()=>{this.successMessage="",this.cdRef.detectChanges()},4e3)})}setAnnouncementPreview(e){e?(e.senderImg=e.senderImg||"assets/icons/no-user-ph.png",e.senderName=e.senderName||"Inserisci un mittente",e.senderMessage=e.senderMessage||"Scrivi qualcosa per vederlo qui...",e.sendTo=e.sendTo||[],e.sendAt={seconds:n(e.sendAt||new Date).unix(),nanoseconds:0}):e={senderImg:"assets/icons/no-user-ph.png",senderName:"Inserisci un mittente",senderMessage:"Scrivi qualcosa per vederlo qui...",sendTo:[],sendAt:{seconds:n().unix(),nanoseconds:0}},e.timeDiff=this.getItemTimeDiff(e,1),this.announcement=e}getItemTimeDiff(e,t){if(!e.sendAt)return"";const s=n.unix(e.sendAt.seconds),i=n().diff(s,"seconds");return Math.abs(i)<=3600&&-1===this.timersDiff.indexOf(t+"")&&(this.timersDiff.push(t+""),setTimeout(()=>{const e=this.announcement,s=this.timersDiff.indexOf(t+"");this.timersDiff.splice(s,1),e.timeDiff=this.getItemTimeDiff(e,t),this.cdRef.detectChanges()},6e4)),s.fromNow()}validateMessage(e){let t="";return e||(t="L'annuncio non \xe8 valido. Completa tutti i dati necessari."),e.senderName||(t="Il nome del mittente non \xe8 valido."),e.senderImg||(t="L'immagine del mittente non \xe8 valida."),e.sendTo.length<=0&&(t="Seleziona almeno un destinatario."),(!e.senderMessage||e.senderMessage.length<15)&&(t="Il messaggio dell'annuncio non \xe8 valido. Deve contenere almeno 15 caratteri."),e.senderLink&&!this.validateURL(e.senderLink)&&(t="Il link inserito nell'annuncio non \xe8 valido."),t?(this.errorMessage=t,setTimeout(()=>{this.errorMessage="",this.cdRef.detectChanges()},3500)):this.errorMessage="",e}validateURL(e){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)}}return e.\u0275fac=function(t){return new(t||e)(i.Mb(i.h),i.Mb(r.a))},e.\u0275cmp=i.Gb({type:e,selectors:[["app-admin-news"]],decls:14,vars:10,consts:[[1,"grid","col-span-1","sm:grid-cols-6","gap-8"],[1,"bg-black-800","py-4","px-6","rounded-md","sm:col-span-4"],[1,"grid","grid-cols-1","sm:grid-cols-2","gap-6"],[3,"resetForm","formValueChanged","sendMessage"],[3,"resetForm","selectedUsers"],[1,"block","md:sticky","top-4","sm:col-span-2","w-full","max-w-full"],[1,"mb-3"],[1,"bg-black-800","rounded-md","overflow-hidden"],[1,"block","w-full",3,"widthFix","detailNotification"],["class","mt-4 text-sm text-gray-500 text-center w-full block",4,"ngIf","ngIfElse"],["noUsersSelected",""],[3,"title","type","show","desc"],[1,"mt-4","text-sm","text-gray-500","text-center","w-full","block"]],template:function(e,t){if(1&e&&(i.Sb(0,"div",0),i.Sb(1,"div",1),i.Sb(2,"div",2),i.Sb(3,"app-admin-news-form",3),i.Zb("formValueChanged",function(e){return t.setAnnouncementPreview(e)})("sendMessage",function(e){return t.sendMessage(e)}),i.Rb(),i.Sb(4,"app-admin-news-users",4),i.Zb("selectedUsers",function(e){return t.updateSelectedUsers(e)}),i.Rb(),i.Rb(),i.Rb(),i.Sb(5,"div",5),i.Sb(6,"h2",6),i.Ec(7,"Anteprima"),i.Rb(),i.Sb(8,"div",7),i.Nb(9,"app-notification-detail",8),i.Rb(),i.Cc(10,M,2,2,"p",9),i.Cc(11,I,2,0,"ng-template",null,10,i.Dc),i.Rb(),i.Rb(),i.Nb(13,"app-alert",11)),2&e){const e=i.tc(12);i.Ab(3),i.jc("resetForm",t.resetForm),i.Ab(1),i.jc("resetForm",t.resetForm),i.Ab(5),i.jc("widthFix",!1)("detailNotification",t.announcement),i.Ab(1),i.jc("ngIf",t.announcement.sendTo.length)("ngIfElse",e),i.Ab(3),i.jc("title",t.errorMessage?"Impossibile salvare l'annuncio":"Salvato con successo")("type",t.errorMessage?"error":"success")("show",!!t.errorMessage||!!t.successMessage)("desc",t.errorMessage||t.successMessage)}},directives:[v,k,y.a,b.m,A.a],encapsulation:2,changeDetection:0}),e})()}}]);