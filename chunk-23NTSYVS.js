import{$a as Ie,A as It,Aa as dt,Ab as St,B as ve,Cb as Ft,D as xt,F as me,Ga as Oe,H as D,J as M,Ja as Ce,K as S,Ka as Te,La as F,Lb as je,M as ge,Na as Ee,Ob as Ze,Q as ye,Qb as Ne,R as we,Rb as Be,S as De,T as be,U as g,V as At,Wb as ke,cb as xe,da as Mt,e as he,ea as at,ib as Ae,kb as Me,l as ct,mb as Se,ob as Fe,q as pe,rb as Pe,sb as Re,tb as _e,y as fe,ya as ut,zb as He}from"./chunk-FEYVFRDP.js";import{a as w}from"./chunk-RR4QGK55.js";import{A as vt,Ac as Q,Ba as et,Ca as wt,Cc as I,D as N,Db as Ct,Ea as u,Eb as Tt,F as B,Ib as ee,Ic as de,La as Dt,Lb as ie,Mb as ot,Ob as ne,P as mt,Pa as h,Pb as oe,R as v,Rb as re,Sa as it,Sb as se,Tb as rt,U as $t,Ua as Kt,Ub as st,Va as C,Wb as ce,Xa as Yt,Yb as ae,cb as G,cd as le,d as x,da as Gt,db as bt,ea as zt,ec as E,fc as Et,g as A,ga as O,gb as Xt,h as Vt,ha as gt,hc as ue,ja as Qt,ka as yt,l as V,la as q,lb as Ot,nb as T,ob as nt,pa as a,pb as z,sa as J,t as l,tb as qt,ub as Jt,va as r,vb as te,xa as $,za as tt}from"./chunk-2XEAWUUP.js";import{a as Ut,b as Wt}from"./chunk-T527G4PA.js";var ii=["viewContainer"],Pt=class{},ni=(()=>{let t=class t{constructor(){this.refresh$=new A,this.pseudoInvalid=T(null),this.internal=T(r(Ne,{self:!0,optional:!0})),this.control=r(ct,{self:!0}),this.destroyRef=r(it),this.cdr=r(Q),this.transformer=r(Pt,{optional:!0}),this.value=I(()=>this.internal()),this.readOnly=T(!1),this.touched=T(!1),this.status=T(void 0),this.disabled=I(()=>this.status()==="DISABLED"),this.interactive=I(()=>!this.disabled()&&!this.readOnly()),this.invalid=I(()=>this.pseudoInvalid()!==null?!!this.pseudoInvalid()&&this.interactive():this.interactive()&&this.touched()&&this.status()==="INVALID"),this.mode=I(()=>this.readOnly()?"readonly":this.invalid()?"invalid":"valid"),this.onTouched=Mt,this.onChange=Mt,this.control.valueAccessor=this,this.refresh$.pipe(mt(0),O(null),l(()=>this.control.control),B(me),v(),gt(e=>N(e.valueChanges,e.statusChanges)),w(this.destroyRef)).subscribe(()=>{this.update()})}set readOnlySetter(e){this.readOnly.set(e)}set invalidSetter(e){this.pseudoInvalid.set(e)}registerOnChange(e){this.refresh$.next(),this.onChange=n=>{n!==this.internal()&&(e(this.toControlValue(n)),this.internal.set(n),this.update())}}registerOnTouched(e){this.onTouched=()=>{e(),this.update()}}setDisabledState(){this.update()}writeValue(e){let n=this.control instanceof pe?this.control.model:e;this.internal.set(this.fromControlValue(n)),this.update()}fromControlValue(e){return this.transformer?this.transformer.fromControlValue(e):e}toControlValue(e){return this.transformer?this.transformer.toControlValue(e):e}update(){this.status.set(this.control.control?.status),this.touched.set(!!this.control.control?.touched),this.cdr.markForCheck()}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,inputs:{readOnlySetter:[0,"readOnly","readOnlySetter"],invalidSetter:[0,"invalid","invalidSetter"]}});let i=t;return V([M],i.prototype,"fromControlValue",null),V([M],i.prototype,"toControlValue",null),i})();function Ni(i){return D(ni,i)}var Le=(()=>{let t=class t{constructor(){this.injector=r(et),this.nothing=r(lt).attach(this)}addComponentChild(e){let n=e.createInjector(this.injector),o=this.vcr.createComponent(e.component,{injector:n});return o.changeDetectorRef.detectChanges(),o}addTemplateChild(e,n){return this.vcr.createEmbeddedView(e,n)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,viewQuery:function(n,o){if(n&1&&se(ii,5,Ot),n&2){let s;rt(s=st())&&(o.vcr=s.first)}}});let i=t;return i})(),lt=(()=>{let t=class t{attach(e){this.host=e}add(e){return this.safeHost.addComponentChild(e)}remove({hostView:e}){e.destroyed||e.destroy()}addTemplate(e,n){return this.safeHost.addTemplateChild(e,n)}removeTemplate(e){e.destroyed||e.destroy()}get safeHost(){if(!this.host)throw new Rt;return this.host}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})();function Ue(i){return D(lt,i)}var Rt=class extends Error{constructor(){super("")}};var b=class{supports(t){return t.includes(this.modifier)}unwrap(t){return t.split(".").filter(d=>!this.modifier.includes(d)).join(".")}},oi=new J("[GLOBAL_HANDLER]: Global event target handler",{factory:()=>{let i=r(de);return t=>t==="body"?i.body:i.defaultView[t]||i.createElement("div")}}),ri=(()=>{let t=class t extends b{constructor(){super(...arguments),this.handler=r(oi),this.modifier=">"}addEventListener(e,n,o){return this.manager.addEventListener(this.handler(n.split(">")[0]),n.split(">")[1],o)}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),si=(()=>{let t=class t extends b{constructor(){super(...arguments),this.modifier="capture.once.passive"}supports(e){return e.includes(".")&&!this.unwrap(e).includes(".")}addEventListener(e,n,o){return e.addEventListener(this.unwrap(n),o,{once:n.includes(".once"),passive:n.includes(".passive"),capture:n.includes(".capture")}),()=>e.removeEventListener(this.unwrap(n),o,n.includes(".capture"))}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),ci=(()=>{let t=class t extends b{constructor(){super(...arguments),this.modifier=".prevent"}addEventListener(e,n,o){return this.manager.addEventListener(e,this.unwrap(n),s=>{s.preventDefault(),o(s)})}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),ai=(()=>{let t=class t extends b{constructor(){super(...arguments),this.modifier="resize"}supports(e){return e==="resize"}addEventListener(e,n,o){if(typeof ResizeObserver>"u"||!(e instanceof Element))return()=>{};let s=new ResizeObserver(c=>this.manager.getZone().run(()=>o(c)));return s.observe(e),()=>s.disconnect()}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),ui=(()=>{let t=class t extends b{constructor(){super(...arguments),this.modifier=".self"}addEventListener(e,n,o){return this.manager.addEventListener(e,this.unwrap(n),s=>{s.target===s.currentTarget&&o(s)})}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),_t=(()=>{let t=class t extends b{constructor(){super(...arguments),this.modifier=".silent"}addEventListener(e,n,o){return t.ngZone=this.manager.getZone(),t.ngZone.runOutsideAngular(()=>this.manager.addEventListener(e,this.unwrap(n),o))}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),di=(()=>{let t=class t extends b{constructor(){super(...arguments),this.modifier=".stop"}addEventListener(e,n,o){return this.manager.addEventListener(e,this.unwrap(n),s=>{s.stopPropagation(),o(s)})}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),li=[_t,ri,si,ci,ai,ui,di],Vi=li.map(i=>({provide:le,multi:!0,useClass:i}));function We(i){return(t,d,e)=>{let{value:n}=e;e.value=function(...o){i.apply(this,o)&&(_t.ngZone?_t.ngZone.run(()=>n.apply(this,o)):n.apply(this,o))}}}var P=(()=>{let t=class t{constructor(){this.control=r(ct,{optional:!0,self:!0}),this.active$=r(je),this.zone=r(C),this.el=g(),this.tuiActiveZoneParent=null,this.subActiveZones=[],this.directParentActiveZone=r(t,{skipSelf:!0,optional:!0}),this.tuiActiveZoneChange=this.active$.pipe(l(e=>!!e&&this.contains(e)),O(!1),v(),zt(1),yt(e=>{!e&&typeof this.control?.valueAccessor.onTouched=="function"&&this.control.valueAccessor.onTouched()}),F(this.zone)),this.directParentActiveZone?.addSubActiveZone(this)}set tuiActiveZoneParentSetter(e){this.setZone(e)}ngOnDestroy(){this.directParentActiveZone?.removeSubActiveZone(this),this.tuiActiveZoneParent?.removeSubActiveZone(this)}contains(e){return this.el.contains(e)||this.subActiveZones.some((n,o,s)=>s.indexOf(n)===o&&n.contains(e))}setZone(e){this.tuiActiveZoneParent?.removeSubActiveZone(this),e?.addSubActiveZone(this),this.tuiActiveZoneParent=e}addSubActiveZone(e){this.subActiveZones=[...this.subActiveZones,e]}removeSubActiveZone(e){this.subActiveZones=fe(this.subActiveZones,this.subActiveZones.indexOf(e))}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,selectors:[["","tuiActiveZone","",5,"ng-container"],["","tuiActiveZoneChange","",5,"ng-container"],["","tuiActiveZoneParent","",5,"ng-container"]],hostBindings:function(n,o){n&1&&ot("mousedown.silent",function(){return 0},!1,G)},inputs:{tuiActiveZoneParentSetter:[0,"tuiActiveZoneParent","tuiActiveZoneParentSetter"]},outputs:{tuiActiveZoneChange:"tuiActiveZoneChange"},exportAs:["tuiActiveZone"],standalone:!0});let i=t;return V([M],i.prototype,"setZone",null),i})();var ht=class{},R=class extends ht{},_=class extends ht{};function Ve(i,t,d){return{provide:i,deps:[[new tt,new $,i],d],useFactory:Ht(t)}}function Ht(i){return(t,d)=>t?.find?.(e=>e!==d&&e.type===i)||d}function $e(i,t){return Ve(R,i,t)}function Ge(i,t){return Ve(_,i,t)}function ze(i){return D(_,i,!0)}var pt=class{};function Qe(i){return D(pt,i,!0)}var K=class extends x{};function Ke(i){return D(K,i,!0)}var Ye=(()=>{let t=class t{constructor(){this.destroyRef=r(it),this.drivers=r(K),this.vehicles=r(pt)}ngOnInit(){let e=this.vehicles.find(({type:n})=>n===this.type);N(...this.drivers.filter(({type:n})=>n===this.type)).pipe(v(),w(this.destroyRef)).subscribe(n=>{e?.toggle(n)})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t});let i=t;return i})();var Dn=(()=>{let t=class t extends x{constructor(){super(e=>this.stream$.subscribe(e)),this.media=r(Ie),this.sorted=Object.values(this.media).sort((e,n)=>e-n),this.invert=Object.keys(this.media).reduce((e,n)=>Wt(Ut({},e),{[this.media[n]]:n}),{}),this.stream$=r(Be).pipe(l(({width:e})=>this.sorted.find(n=>n>e)),l(e=>this.invert[e||this.sorted[this.sorted.length-1]]),v(),F(r(C)),Gt({bufferSize:1,refCount:!0}))}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var jt=(()=>{let t=class t extends x{constructor(){let e=r(dt),n=r(C);super(o=>e.pipe(O(null),l(()=>this.accessor.getPosition(this.el.getBoundingClientRect())),Te(n),$t(()=>this.accessor.getPosition(at))).subscribe(o)),this.el=g(),this.accessor=r(R)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),Xe=(()=>{let t=class t{constructor(){this.isWebkit=r(Ze),this.win=r(ut)}correct(e){return this.isWebkit?[e[0]+(this.win.visualViewport?.offsetTop??0),e[1]+(this.win.visualViewport?.offsetLeft??0)]:e}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();function Zt(i,t,d,e){var n=arguments.length,o=n<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,d):e,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,t,d,e);else for(var c=i.length-1;c>=0;c--)(s=i[c])&&(o=(n<3?s(o):n>3?s(t,d,o):s(t,d))||o);return n>3&&o&&Object.defineProperty(t,d,o),o}var qe=(()=>{let t=class t extends x{constructor(){super(e=>this.obscured$.subscribe(e)),this.el=g(),this.obscured$=r(dt).pipe(q(100),l(()=>be(this.el)),O(null),v(),F(r(C)))}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),ft=(()=>{let t=class t{constructor(){this.activeZone=r(P,{optional:!0}),this.enabled$=new A,this.obscured$=r(qe,{self:!0}).pipe(l(e=>!!e?.every(n=>!this.activeZone?.contains(n)))),this.tuiObscured=this.enabled$.pipe(Oe(()=>this.obscured$))}set tuiObscuredEnabled(e){this.enabled$.next(e)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,selectors:[["","tuiObscured",""]],inputs:{tuiObscuredEnabled:"tuiObscuredEnabled"},outputs:{tuiObscured:"tuiObscured"},standalone:!0,features:[E([qe])]});let i=t;return i})();var vi=i=>({$implicit:i});function mi(i,t){if(i&1&&(Ct(0,"div",2),ce(1),Tt()),i&2){let d=t.polymorpheusOutlet;bt(),ae(" ",d," ")}}var gi=["tuiDropdownHost"],yi=["*"],Nt=(()=>{let t=class t extends A{constructor(){super(...arguments),this.type="dropdown"}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac});let i=t;return i})(),wi=(()=>{let t=class t extends Ye{constructor(){super(...arguments),this.type="dropdown"}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275dir=u({type:t,selectors:[["","tuiDropdownDriver",""]],standalone:!0,features:[nt]});let i=t;return i})(),Di=ve(()=>Ci),bi=new J(""),Je=(()=>{let t=class t extends lt{};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})(),ti={align:"left",direction:null,limitWidth:"auto",maxHeight:400,minHeight:80,offset:4,appearance:""},L=It(ti),Ao=i=>({provide:L,deps:[[new $,Oi],[new $,new tt,L]],useFactory:Se(i,ti)}),Oi=(()=>{let t=class t{constructor(){this.options=r(L,{skipSelf:!0}),this.align=this.options.align,this.appearance=this.options.appearance,this.direction=this.options.direction,this.limitWidth=this.options.limitWidth,this.minHeight=this.options.minHeight,this.maxHeight=this.options.maxHeight,this.offset=this.options.offset}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,selectors:[["","tuiDropdownAlign",""],["","tuiDropdownAppearance",""],["","tuiDropdownDirection",""],["","tuiDropdownLimitWidth",""],["","tuiDropdownMinHeight",""],["","tuiDropdownMaxHeight",""],["","tuiDropdownOffset",""]],inputs:{align:[0,"tuiDropdownAlign","align"],appearance:[0,"tuiDropdownAppearance","appearance"],direction:[0,"tuiDropdownDirection","direction"],limitWidth:[0,"tuiDropdownLimitWidth","limitWidth"],minHeight:[0,"tuiDropdownMinHeight","minHeight"],maxHeight:[0,"tuiDropdownMaxHeight","maxHeight"],offset:[0,"tuiDropdownOffset","offset"]},standalone:!0,features:[E([D(L,t)])]});let i=t;return i})(),ei=(()=>{let t=class t extends R{constructor(){super(...arguments),this.options=r(L),this.viewport=r(xe),this.type="dropdown",this.accessor=Ht("dropdown")(r(_),r(Y,{optional:!0}))}getPosition({width:e,height:n}){!e&&!n&&(this.previous=void 0);let o=this.accessor?.getClientRect()??at,s=this.viewport.getClientRect(),{minHeight:c,align:y,direction:U,offset:p,limitWidth:X}=this.options,m={top:s.top-p,bottom:s.bottom+p,right:s.right-p,left:s.left+p},f=this.previous||U||"bottom",H={top:o.top-2*p-m.top,bottom:m.bottom-o.bottom-2*p},j=X==="fixed"?o.width:e,W=Math.max(o.right-j,p),kt=o.left+e<m.right?o.left:W,Z={top:o.top-p-n,bottom:o.bottom+p,right:Math.max(m.left,W),center:o.left+o.width/2+e/2<m.right?o.left+o.width/2-e/2:W,left:Math.max(m.left,kt)},Lt=H.top>H.bottom?"top":"bottom";return H[f]>c&&U||H[f]>n?[Z[f],Z[y]]:(this.previous=Lt,[Z[Lt],Z[y]])}};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275dir=u({type:t,selectors:[["","tuiDropdownPosition",""]],standalone:!0,features:[nt]});let i=t;return i})(),Y=(()=>{let t=class t{constructor(){this.refresh$=new A,this.service=r(Je),this.cdr=r(Q),this.sub=this.refresh$.pipe(q(0),w()).subscribe(()=>{this.ref()?.changeDetectorRef.detectChanges(),this.ref()?.changeDetectorRef.markForCheck()}),this.el=g(),this.type="dropdown",this.component=new Pe(r(Di),r(et)),this.ref=T(null)}set tuiDropdown(e){this.content=e instanceof Xt?new Re(e,this.cdr):e}get position(){return Ae(this.el)?"fixed":"absolute"}ngAfterViewChecked(){this.refresh$.next()}ngOnChanges(){this.content||this.toggle(!1)}ngOnDestroy(){this.toggle(!1)}getClientRect(){return this.el.getBoundingClientRect()}toggle(e){let n=this.ref();e&&this.content&&!n?this.ref.set(this.service.add(this.component)):!e&&n&&(this.ref.set(null),this.service.remove(n))}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,selectors:[["","tuiDropdown","",5,"ng-container",5,"ng-template"]],inputs:{tuiDropdown:"tuiDropdown"},exportAs:["tuiDropdown"],standalone:!0,features:[E([ze(t),Qe(t)]),z([wi,ei]),Dt]});let i=t;return Zt([M],i.prototype,"position",null),i})(),Ci=(()=>{let t=class t{constructor(){this.el=g(),this.accessor=r(_),this.win=r(ut),this.vvs=r(Xe),this.animation=Fe(r(Ee)),this.options=r(L),this.directive=r(Y),this.context=r(bi,{optional:!0}),this.theme=this.directive.el.closest("[tuiTheme]")?.getAttribute("tuiTheme"),this.sub=r(jt).pipe(Qt(()=>this.directive.el.isConnected),l(e=>this.directive.position==="fixed"?this.vvs.correct(e):e),l(([e,n])=>this.getStyles(e,n)),w()).subscribe({next:e=>Object.assign(this.el.style,e),complete:()=>this.close()}),this.close=()=>this.directive.toggle(!1)}getStyles(e,n){let{right:o}=this.el.getBoundingClientRect(),{maxHeight:s,minHeight:c,offset:y,limitWidth:U}=this.options,{innerHeight:p}=this.win,X=this.el.offsetParent?.getBoundingClientRect(),{position:m}=this.directive,f=this.accessor.getClientRect(),H=m==="fixed"?0:-(X?.left||0),j=m==="fixed"?0:-(X?.top||0);e+=j,n+=H;let W=o<=f.left||n>=f.right,Z=n<f.right&&o>f.left&&e<j+2*y?f.top-2*y:j+p-e-y;return{position:m,top:S(Math.round(Math.max(e,j+y))),left:S(Math.round(n)),maxHeight:W?S(s):S(Math.round(ge(Z,c,s))),width:U==="fixed"?S(Math.round(f.width)):"",minWidth:U==="min"?S(Math.round(f.width)):""}}};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=wt({type:t,selectors:[["tui-dropdown"]],hostVars:3,hostBindings:function(n,o){n&2&&(ie("@tuiDropdownAnimation",o.animation),Jt("data-appearance",o.options.appearance)("tuiTheme",o.theme))},standalone:!0,features:[E([jt,$e("dropdown",ei),Ge("dropdown",Y)]),z([P]),Et],decls:2,vars:4,consts:[[1,"t-scroll"],["class","t-primitive",4,"polymorpheusOutlet","polymorpheusOutletContext"],[1,"t-primitive"]],template:function(n,o){n&1&&(Ct(0,"tui-scrollbar",0),qt(1,mi,2,1,"div",1),Tt()),n&2&&(bt(),te("polymorpheusOutlet",o.directive.content)("polymorpheusOutletContext",ue(2,vi,o.close)))},dependencies:[_e,ke],styles:["[_nghost-%COMP%]{position:absolute;display:flex;box-shadow:var(--tui-shadow-medium);background:var(--tui-background-elevation-2);border-radius:var(--tui-radius-m);overflow:hidden;border:1px solid var(--tui-border-normal);box-sizing:border-box;max-width:calc(100% - 8px);isolation:isolate;pointer-events:auto}.ng-animating[_nghost-%COMP%]{pointer-events:none}[_nghost-%COMP%]:not([style*=top]){visibility:hidden}.t-scroll[_ngcontent-%COMP%]{flex-grow:1;max-width:100%;overscroll-behavior:none}.t-primitive[_ngcontent-%COMP%]{padding:1rem}"],data:{animation:[he]}});let i=t;return i})();var Ti={showDelay:200,hideDelay:500},Mo=It(Ti);function Ei(i){return"key"in i&&i.key.toLowerCase()==="escape"&&this.tuiDropdownEnabled&&!!this.tuiDropdownOpen&&!this.dropdown()?.nextElementSibling}var Bt=(()=>{let t=class t{constructor(){this.directive=r(Y),this.el=g(),this.obscured=r(ft),this.dropdown=I(()=>this.directive.ref()?.location.nativeElement),this.sub=N(this.obscured.tuiObscured.pipe(B(Boolean)),r(P).tuiActiveZoneChange.pipe(B(e=>!e)),vt(this.el,"focusin").pipe(l(De),B(e=>!this.host.contains(e)||!this.directive.ref()))).pipe(Ce(r(Q)),w()).subscribe(()=>this.toggle(!1)),this.tuiDropdownEnabled=!0,this.tuiDropdownOpen=!1,this.tuiDropdownOpenChange=new Kt,this.driver=r(Nt)}ngOnChanges(){this.drive()}toggle(e){this.focused&&!e&&this.host.focus({preventScroll:!0}),this.update(e)}onClick(e){!this.editable&&this.host.contains(e)&&this.update(!this.tuiDropdownOpen)}onArrow(e,n){!ye(e.target)||!this.host.contains(e.target)||!this.tuiDropdownEnabled||(e.preventDefault(),this.focusDropdown(n))}onEsc(e){e.preventDefault(),this.toggle(!1)}onKeydown({key:e,target:n,defaultPrevented:o}){o||!Me(e)||!this.editable||!this.focused||!we(n)||At(n)&&n!==this.host||(this.update(!0),this.host.focus({preventScroll:!0}))}get host(){let e=this.dropdownHost?.nativeElement||this.el,n=He(e)?e:St({initial:e,root:this.el});return this.dropdownHost?.nativeElement||n||this.el}get editable(){return At(this.host)}get focused(){return Ft(this.host)||Ft(this.dropdown())}update(e){e&&!this.tuiDropdownEnabled||(this.tuiDropdownOpen=e,this.tuiDropdownOpenChange.emit(e),this.drive())}drive(e=this.tuiDropdownOpen&&this.tuiDropdownEnabled){this.obscured.tuiObscuredEnabled=!!e,this.driver.next(!!e)}focusDropdown(e){let n=this.dropdown();if(!n){this.update(!0);return}let o=this.el.ownerDocument,s=n.appendChild(o.createElement("div")),y=St({initial:e?s:n,previous:e,root:n});s.remove(),y?.focus()}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,selectors:[["","tuiDropdown","","tuiDropdownOpen",""],["","tuiDropdown","","tuiDropdownOpenChange",""]],contentQueries:function(n,o,s){if(n&1&&re(s,gi,5,Yt),n&2){let c;rt(c=st())&&(o.dropdownHost=c.first)}},hostBindings:function(n,o){n&1&&ot("click",function(c){return o.onClick(c.target)})("keydown.arrowDown",function(c){return o.onArrow(c,!1)})("keydown.arrowUp",function(c){return o.onArrow(c,!0)})("keydown.silent.capture",function(c){return o.onEsc(c)},!1,G)("keydown.silent",function(c){return o.onKeydown(c)},!1,G)},inputs:{tuiDropdownEnabled:"tuiDropdownEnabled",tuiDropdownOpen:"tuiDropdownOpen"},outputs:{tuiDropdownOpenChange:"tuiDropdownOpenChange"},standalone:!0,features:[E([Nt,Ke(Nt)]),z([ft,{directive:P,inputs:["tuiActiveZoneParent","tuiActiveZoneParent"],outputs:["tuiActiveZoneChange","tuiActiveZoneChange"]}]),Dt]});let i=t;return Zt([We(Ei)],i.prototype,"onEsc",null),i})();var So=(()=>{let t=class t{constructor(){this.tuiDropdownOpenChange=new Vt(!1)}set tuiDropdownOpen(e){this.tuiDropdownOpenChange.next(e)}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,selectors:[["","tuiDropdownOpen","",3,"tuiDropdown",""],["","tuiDropdownOpenChange","",3,"tuiDropdown",""]],inputs:{tuiDropdownOpen:"tuiDropdownOpen"},outputs:{tuiDropdownOpenChange:"tuiDropdownOpenChange"},standalone:!0});let i=t;return i})();function Fo(i){return xt(Y,"tuiDropdown",i)}function Po(){let i=xt(Bt,"tuiDropdownOpen",!1);return r(Bt).tuiDropdownOpenChange.pipe(w()).subscribe(t=>i.set(t)),i}var Ro=(()=>{let t=class t extends Le{};t.\u0275fac=(()=>{let e;return function(o){return(e||(e=h(t)))(o||t)}})(),t.\u0275cmp=wt({type:t,selectors:[["tui-dropdowns"]],standalone:!0,features:[E([Ue(Je)]),nt,Et],ngContentSelectors:yi,decls:3,vars:0,consts:[["viewContainer",""]],template:function(n,o){n&1&&(ne(),oe(0),ee(1,null,0))},styles:["[_nghost-%COMP%]{display:block;height:100%;isolation:isolate}"],changeDetection:0});let i=t;return i})(),_o=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=u({type:t,standalone:!0,features:[z([{directive:Bt,inputs:["tuiDropdownOpen","open"],outputs:["tuiDropdownOpenChange","openChange"]}])]});let i=t;return i})();export{R as a,_ as b,Ht as c,$e as d,Ge as e,ze as f,Qe as g,K as h,Ke as i,Ye as j,Dn as k,jt as l,Xe as m,P as n,Zt as o,Pt as p,Ni as q,Vi as r,Di as s,Ao as t,Y as u,Ci as v,Bt as w,So as x,Fo as y,Po as z,Ro as A,_o as B};
