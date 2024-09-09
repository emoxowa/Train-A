import{j as L,l as Z,m as k,n as G}from"./chunk-OBQ5ZBLJ.js";import"./chunk-23NTSYVS.js";import"./chunk-NKXSX425.js";import{a as X}from"./chunk-GQC6GBTQ.js";import{a as Y,b as ne}from"./chunk-4EZILGJR.js";import"./chunk-BYXBJQAS.js";import{a as V}from"./chunk-LRBDKUDH.js";import{a as K,d as Q}from"./chunk-IMOUA4KZ.js";import{hb as B,i as F,k as x,m as S,n as E,r as N,s as D,u as O,v as I,x as M}from"./chunk-FEYVFRDP.js";import{a as h}from"./chunk-U3QCFURK.js";import{b as te,c as ie,d as oe}from"./chunk-GYE77XHX.js";import{o as A}from"./chunk-RR4QGK55.js";import{d as ee}from"./chunk-EH7XB44O.js";import{$b as q,Ca as c,Db as o,Eb as n,Fb as p,Jb as y,La as $,Ma as g,Mb as f,Na as C,Nb as m,Rc as b,Uc as J,Wb as s,Xb as P,_b as W,ac as H,db as a,fc as _,lc as w,mc as T,t as j,tb as v,va as u,vb as l}from"./chunk-2XEAWUUP.js";import"./chunk-T527G4PA.js";function pe(t,i){if(t&1&&(o(0,"h2",4),s(1),n()),t&2){let e=m();a(),P(e.type)}}function me(t,i){if(t&1){let e=y();o(0,"div",5)(1,"div",6),s(2),n(),o(3,"button",7),f("click",function(){g(e);let d=m();return C(d.onEdit())}),p(4,"tui-icon",8),n()()}if(t&2){let e=m();a(2),P(e.value)}}function de(t,i){if(t&1){let e=y();o(0,"form",9),f("ngSubmit",function(){g(e);let d=m();return C(d.onSave())}),o(1,"tui-textfield",10)(2,"label",11),s(3),n(),p(4,"input",12),n(),o(5,"button",13),p(6,"tui-icon",14),n()()}if(t&2){let e=m();l("formGroup",e.fieldForm),a(2),l("for",e.type),a(),P(e.type),a(),l("id",e.type)}}var U=class t{formBuilder=u(I);store=u(A);type;value;fieldForm=this.formBuilder.group({value:["",x.required]});isEdit=!1;ngOnChanges(){this.fieldForm.patchValue({value:this.value})}onEdit(){this.isEdit=!0}onSave(){let i=this.fieldForm.get("value")?.value;i&&(this.store.dispatch(h.updateUserInformation({updates:{[this.type]:i}})),this.isEdit=!1)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=c({type:t,selectors:[["app-profile-field"]],inputs:{type:"type",value:"value"},standalone:!0,features:[$,_],decls:4,vars:3,consts:[[1,"field"],["tuiTitle","",4,"ngIf"],["class","field__container",4,"ngIf"],["class","field__container",3,"formGroup","ngSubmit",4,"ngIf"],["tuiTitle",""],[1,"field__container"],[1,"field__value"],["appearance","primary","size","xs","tuiButton","","type","button",3,"click"],["icon","@tui.pencil"],[1,"field__container",3,"ngSubmit","formGroup"],["tuiTextfieldSize","s",1,"field__input"],["tuiLabel","",3,"for"],["tuiTextfield","","type","email","formControlName","value",3,"id"],["appearance","primary","size","xs","tuiButton","","type","submit"],["icon","@tui.save"]],template:function(e,r){e&1&&(o(0,"div",0),v(1,pe,2,1,"h2",1)(2,me,5,1,"div",2)(3,de,7,4,"form",3),n()),e&2&&(a(),l("ngIf",r.type),a(),l("ngIf",!r.isEdit),a(),l("ngIf",r.isEdit))},dependencies:[B,V,b,X,M,N,F,S,E,D,O,L,k,G,Z],styles:[".field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.field__container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:2rem}.field__input[_ngcontent-%COMP%], .field__value[_ngcontent-%COMP%]{width:calc(100% - 3.5rem)}"]})};function ue(t,i){t&1&&(o(0,"div",8),s(1,"manager"),n())}function fe(t,i){if(t&1){let e=y();o(0,"form",9),f("ngSubmit",function(){g(e);let d=m();return C(d.onChangePasswordFormSubmit())}),o(1,"h2",10),s(2,"Change Password"),n(),o(3,"tui-textfield",11)(4,"label",12),s(5,"New Password"),n(),p(6,"input",13),n(),o(7,"button",14),s(8,"Save"),n()()}if(t&2){let e=m();l("formGroup",e.changePasswordForm),a(7),l("disabled",e.changePasswordForm.invalid)}}var z=class t{store=u(A);router=u(ee);formBuilder=u(I);userName$=this.store.select(te);userEmail$=this.store.select(ie);isManager$=this.store.select(oe).pipe(j(i=>i==="manager"));changePasswordForm=this.formBuilder.group({password:["",[x.required,x.minLength(8)]]});isPasswordFormOpen=!1;onLogout(){this.router.navigate(["/"]),this.store.dispatch(h.logout())}showChangePasswordForm(){this.isPasswordFormOpen=!0}onChangePasswordFormSubmit(){let i=this.changePasswordForm.get("password")?.value;i&&(this.isPasswordFormOpen=!1,this.store.dispatch(h.updatePassword({password:i})))}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=c({type:t,selectors:[["app-profile-card"]],standalone:!0,features:[_],decls:14,vars:10,consts:[["tuiCardLarge","","tuiSurface","elevated",1,"profile"],["tuiTitle","l",1,"profile__title"],["class","profile__role",4,"ngIf"],["tuiButton","","appearance","primary","size","m",1,"profile__button",3,"click"],["type","name",3,"value"],["type","email",3,"value"],["tuiButton","","size","m","appearance","destructive",1,"profile__button",3,"click"],[3,"tuiDialogChange","tuiDialog"],[1,"profile__role"],[1,"password-form",3,"ngSubmit","formGroup"],["tuiTitle","m"],[1,"field__input"],["for","password","tuiLabel",""],["tuiTextfield","","type","password","formControlName","password","id","password","tuiAutoFocus",""],["tuiButton","","type","submit",1,"password-form__button",3,"disabled"]],template:function(e,r){e&1&&(o(0,"div",0)(1,"h1",1),s(2,"Profile"),n(),v(3,ue,2,0,"div",2),w(4,"async"),o(5,"button",3),f("click",function(){return r.showChangePasswordForm()}),s(6," Change Password "),n(),p(7,"app-profile-field",4),w(8,"async"),p(9,"app-profile-field",5),w(10,"async"),o(11,"button",6),f("click",function(){return r.onLogout()}),s(12,"Logout"),n()(),v(13,fe,9,2,"ng-template",7),H("tuiDialogChange",function(R){return q(r.isPasswordFormOpen,R)||(r.isPasswordFormOpen=R),R})),e&2&&(a(3),l("ngIf",T(4,4,r.isManager$)),a(4),l("value",T(8,6,r.userName$)||""),a(2),l("value",T(10,8,r.userEmail$)||""),a(4),W("tuiDialog",r.isPasswordFormOpen))},dependencies:[J,b,U,ne,Y,V,Q,M,N,F,S,E,D,O,K,B,L,k,G],styles:["[_nghost-%COMP%]{display:block;width:42.5rem;max-width:100%;margin:0 auto}.profile__button[_ngcontent-%COMP%]{align-self:flex-start}.password-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2rem}.password-form__button[_ngcontent-%COMP%]{align-self:flex-start}"]})};var le=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=c({type:t,selectors:[["app-profile"]],standalone:!0,features:[_],decls:1,vars:0,template:function(e,r){e&1&&p(0,"app-profile-card")},dependencies:[z],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;max-width:calc(100vw - 40px);margin:0 1rem;margin:100px 0 0}"]})};export{le as ProfileComponent};
