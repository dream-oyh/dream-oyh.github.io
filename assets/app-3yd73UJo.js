/**
* @vue/shared v3.4.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Da(e,t){const n=new Set(e.split(","));return t?r=>n.has(r.toLowerCase()):r=>n.has(r)}const Ee={},In=[],ot=()=>{},Nd=()=>!1,Cr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Na=e=>e.startsWith("onUpdate:"),$e=Object.assign,ja=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},jd=Object.prototype.hasOwnProperty,de=(e,t)=>jd.call(e,t),ne=Array.isArray,rr=e=>ml(e)==="[object Map]",Vd=e=>ml(e)==="[object Set]",re=e=>typeof e=="function",Ve=e=>typeof e=="string",gl=e=>typeof e=="symbol",Ae=e=>e!==null&&typeof e=="object",fi=e=>(Ae(e)||re(e))&&re(e.then)&&re(e.catch),Hd=Object.prototype.toString,ml=e=>Hd.call(e),zd=e=>ml(e).slice(8,-1),Bd=e=>ml(e)==="[object Object]",Va=e=>Ve(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Pn=Da(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),vl=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Fd=/-(\w)/g,Ze=vl(e=>e.replace(Fd,(t,n)=>n?n.toUpperCase():"")),Gd=/\B([A-Z])/g,Gn=vl(e=>e.replace(Gd,"-$1").toLowerCase()),Wn=vl(e=>e.charAt(0).toUpperCase()+e.slice(1)),$l=vl(e=>e?`on${Wn(e)}`:""),Xt=(e,t)=>!Object.is(e,t),Dl=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},rl=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},Wd=e=>{const t=parseFloat(e);return isNaN(t)?e:t},Ud=e=>{const t=Ve(e)?Number(e):NaN;return isNaN(t)?e:t};let Ns;const hi=()=>Ns||(Ns=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ha(e){if(ne(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],l=Ve(r)?Yd(r):Ha(r);if(l)for(const a in l)t[a]=l[a]}return t}else if(Ve(e)||Ae(e))return e}const qd=/;(?![^(]*\))/g,Kd=/:([^]+)/,Zd=/\/\*[^]*?\*\//g;function Yd(e){const t={};return e.replace(Zd,"").split(qd).forEach(n=>{if(n){const r=n.split(Kd);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function za(e){let t="";if(Ve(e))t=e;else if(ne(e))for(let n=0;n<e.length;n++){const r=za(e[n]);r&&(t+=r+" ")}else if(Ae(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Xd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Jd=Da(Xd);function gi(e){return!!e||e===""}/**
* @vue/reactivity v3.4.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Qe;class Qd{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Qe,!t&&Qe&&(this.index=(Qe.scopes||(Qe.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=Qe;try{return Qe=this,t()}finally{Qe=n}}}on(){Qe=this}off(){Qe=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const l=this.parent.scopes.pop();l&&l!==this&&(this.parent.scopes[this.index]=l,l.index=this.index)}this.parent=void 0,this._active=!1}}}function e1(e,t=Qe){t&&t.active&&t.effects.push(e)}function mi(){return Qe}function t1(e){Qe&&Qe.cleanups.push(e)}let pn;class Ba{constructor(t,n,r,l){this.fn=t,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,e1(this,l)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,mn();for(let t=0;t<this._depsLength;t++){const n=this.deps[t];if(n.computed&&(n1(n.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),vn()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=Zt,n=pn;try{return Zt=!0,pn=this,this._runnings++,js(this),this.fn()}finally{Vs(this),this._runnings--,pn=n,Zt=t}}stop(){var t;this.active&&(js(this),Vs(this),(t=this.onStop)==null||t.call(this),this.active=!1)}}function n1(e){return e.value}function js(e){e._trackId++,e._depsLength=0}function Vs(e){if(e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)vi(e.deps[t],e);e.deps.length=e._depsLength}}function vi(e,t){const n=e.get(t);n!==void 0&&t._trackId!==n&&(e.delete(t),e.size===0&&e.cleanup())}let Zt=!0,ca=0;const yi=[];function mn(){yi.push(Zt),Zt=!1}function vn(){const e=yi.pop();Zt=e===void 0?!0:e}function Fa(){ca++}function Ga(){for(ca--;!ca&&ua.length;)ua.shift()()}function bi(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const r=e.deps[e._depsLength];r!==t?(r&&vi(r,e),e.deps[e._depsLength++]=t):e._depsLength++}}const ua=[];function xi(e,t,n){Fa();for(const r of e.keys()){let l;r._dirtyLevel<t&&(l??(l=e.get(r)===r._trackId))&&(r._shouldSchedule||(r._shouldSchedule=r._dirtyLevel===0),r._dirtyLevel=t),r._shouldSchedule&&(l??(l=e.get(r)===r._trackId))&&(r.trigger(),(!r._runnings||r.allowRecurse)&&r._dirtyLevel!==2&&(r._shouldSchedule=!1,r.scheduler&&ua.push(r.scheduler)))}Ga()}const wi=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},ll=new WeakMap,fn=Symbol(""),da=Symbol("");function Ye(e,t,n){if(Zt&&pn){let r=ll.get(e);r||ll.set(e,r=new Map);let l=r.get(n);l||r.set(n,l=wi(()=>r.delete(n))),bi(pn,l)}}function Mt(e,t,n,r,l,a){const s=ll.get(e);if(!s)return;let i=[];if(t==="clear")i=[...s.values()];else if(n==="length"&&ne(e)){const u=Number(r);s.forEach((c,d)=>{(d==="length"||!gl(d)&&d>=u)&&i.push(c)})}else switch(n!==void 0&&i.push(s.get(n)),t){case"add":ne(e)?Va(n)&&i.push(s.get("length")):(i.push(s.get(fn)),rr(e)&&i.push(s.get(da)));break;case"delete":ne(e)||(i.push(s.get(fn)),rr(e)&&i.push(s.get(da)));break;case"set":rr(e)&&i.push(s.get(fn));break}Fa();for(const u of i)u&&xi(u,4);Ga()}function r1(e,t){var n;return(n=ll.get(e))==null?void 0:n.get(t)}const l1=Da("__proto__,__v_isRef,__isVue"),_i=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(gl)),Hs=a1();function a1(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=ie(this);for(let a=0,s=this.length;a<s;a++)Ye(r,"get",a+"");const l=r[t](...n);return l===-1||l===!1?r[t](...n.map(ie)):l}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){mn(),Fa();const r=ie(this)[t].apply(this,n);return Ga(),vn(),r}}),e}function s1(e){const t=ie(this);return Ye(t,"has",e),t.hasOwnProperty(e)}class ki{constructor(t=!1,n=!1){this._isReadonly=t,this._shallow=n}get(t,n,r){const l=this._isReadonly,a=this._shallow;if(n==="__v_isReactive")return!l;if(n==="__v_isReadonly")return l;if(n==="__v_isShallow")return a;if(n==="__v_raw")return r===(l?a?b1:Li:a?Ti:Ci).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const s=ne(t);if(!l){if(s&&de(Hs,n))return Reflect.get(Hs,n,r);if(n==="hasOwnProperty")return s1}const i=Reflect.get(t,n,r);return(gl(n)?_i.has(n):l1(n))||(l||Ye(t,"get",n),a)?i:He(i)?s&&Va(n)?i:i.value:Ae(i)?l?en(i):Tr(i):i}}class Ei extends ki{constructor(t=!1){super(!1,t)}set(t,n,r,l){let a=t[n];if(!this._shallow){const u=jn(a);if(!al(r)&&!jn(r)&&(a=ie(a),r=ie(r)),!ne(t)&&He(a)&&!He(r))return u?!1:(a.value=r,!0)}const s=ne(t)&&Va(n)?Number(n)<t.length:de(t,n),i=Reflect.set(t,n,r,l);return t===ie(l)&&(s?Xt(r,a)&&Mt(t,"set",n,r):Mt(t,"add",n,r)),i}deleteProperty(t,n){const r=de(t,n);t[n];const l=Reflect.deleteProperty(t,n);return l&&r&&Mt(t,"delete",n,void 0),l}has(t,n){const r=Reflect.has(t,n);return(!gl(n)||!_i.has(n))&&Ye(t,"has",n),r}ownKeys(t){return Ye(t,"iterate",ne(t)?"length":fn),Reflect.ownKeys(t)}}class o1 extends ki{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const i1=new Ei,c1=new o1,u1=new Ei(!0),Wa=e=>e,yl=e=>Reflect.getPrototypeOf(e);function Hr(e,t,n=!1,r=!1){e=e.__v_raw;const l=ie(e),a=ie(t);n||(Xt(t,a)&&Ye(l,"get",t),Ye(l,"get",a));const{has:s}=yl(l),i=r?Wa:n?Ka:fr;if(s.call(l,t))return i(e.get(t));if(s.call(l,a))return i(e.get(a));e!==l&&e.get(t)}function zr(e,t=!1){const n=this.__v_raw,r=ie(n),l=ie(e);return t||(Xt(e,l)&&Ye(r,"has",e),Ye(r,"has",l)),e===l?n.has(e):n.has(e)||n.has(l)}function Br(e,t=!1){return e=e.__v_raw,!t&&Ye(ie(e),"iterate",fn),Reflect.get(e,"size",e)}function zs(e){e=ie(e);const t=ie(this);return yl(t).has.call(t,e)||(t.add(e),Mt(t,"add",e,e)),this}function Bs(e,t){t=ie(t);const n=ie(this),{has:r,get:l}=yl(n);let a=r.call(n,e);a||(e=ie(e),a=r.call(n,e));const s=l.call(n,e);return n.set(e,t),a?Xt(t,s)&&Mt(n,"set",e,t):Mt(n,"add",e,t),this}function Fs(e){const t=ie(this),{has:n,get:r}=yl(t);let l=n.call(t,e);l||(e=ie(e),l=n.call(t,e)),r&&r.call(t,e);const a=t.delete(e);return l&&Mt(t,"delete",e,void 0),a}function Gs(){const e=ie(this),t=e.size!==0,n=e.clear();return t&&Mt(e,"clear",void 0,void 0),n}function Fr(e,t){return function(r,l){const a=this,s=a.__v_raw,i=ie(s),u=t?Wa:e?Ka:fr;return!e&&Ye(i,"iterate",fn),s.forEach((c,d)=>r.call(l,u(c),u(d),a))}}function Gr(e,t,n){return function(...r){const l=this.__v_raw,a=ie(l),s=rr(a),i=e==="entries"||e===Symbol.iterator&&s,u=e==="keys"&&s,c=l[e](...r),d=n?Wa:t?Ka:fr;return!t&&Ye(a,"iterate",u?da:fn),{next(){const{value:p,done:f}=c.next();return f?{value:p,done:f}:{value:i?[d(p[0]),d(p[1])]:d(p),done:f}},[Symbol.iterator](){return this}}}}function jt(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function d1(){const e={get(a){return Hr(this,a)},get size(){return Br(this)},has:zr,add:zs,set:Bs,delete:Fs,clear:Gs,forEach:Fr(!1,!1)},t={get(a){return Hr(this,a,!1,!0)},get size(){return Br(this)},has:zr,add:zs,set:Bs,delete:Fs,clear:Gs,forEach:Fr(!1,!0)},n={get(a){return Hr(this,a,!0)},get size(){return Br(this,!0)},has(a){return zr.call(this,a,!0)},add:jt("add"),set:jt("set"),delete:jt("delete"),clear:jt("clear"),forEach:Fr(!0,!1)},r={get(a){return Hr(this,a,!0,!0)},get size(){return Br(this,!0)},has(a){return zr.call(this,a,!0)},add:jt("add"),set:jt("set"),delete:jt("delete"),clear:jt("clear"),forEach:Fr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(a=>{e[a]=Gr(a,!1,!1),n[a]=Gr(a,!0,!1),t[a]=Gr(a,!1,!0),r[a]=Gr(a,!0,!0)}),[e,n,t,r]}const[p1,f1,h1,g1]=d1();function Ua(e,t){const n=t?e?g1:h1:e?f1:p1;return(r,l,a)=>l==="__v_isReactive"?!e:l==="__v_isReadonly"?e:l==="__v_raw"?r:Reflect.get(de(n,l)&&l in r?n:r,l,a)}const m1={get:Ua(!1,!1)},v1={get:Ua(!1,!0)},y1={get:Ua(!0,!1)},Ci=new WeakMap,Ti=new WeakMap,Li=new WeakMap,b1=new WeakMap;function x1(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function w1(e){return e.__v_skip||!Object.isExtensible(e)?0:x1(zd(e))}function Tr(e){return jn(e)?e:qa(e,!1,i1,m1,Ci)}function Si(e){return qa(e,!1,u1,v1,Ti)}function en(e){return qa(e,!0,c1,y1,Li)}function qa(e,t,n,r,l){if(!Ae(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const a=l.get(e);if(a)return a;const s=w1(e);if(s===0)return e;const i=new Proxy(e,s===2?r:n);return l.set(e,i),i}function Mn(e){return jn(e)?Mn(e.__v_raw):!!(e&&e.__v_isReactive)}function jn(e){return!!(e&&e.__v_isReadonly)}function al(e){return!!(e&&e.__v_isShallow)}function Ai(e){return Mn(e)||jn(e)}function ie(e){const t=e&&e.__v_raw;return t?ie(t):e}function Ii(e){return Object.isExtensible(e)&&rl(e,"__v_skip",!0),e}const fr=e=>Ae(e)?Tr(e):e,Ka=e=>Ae(e)?en(e):e;class Pi{constructor(t,n,r,l){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Ba(()=>t(this._value),()=>lr(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!l,this.__v_isReadonly=r}get value(){const t=ie(this);return(!t._cacheable||t.effect.dirty)&&Xt(t._value,t._value=t.effect.run())&&lr(t,4),Za(t),t.effect._dirtyLevel>=2&&lr(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function _1(e,t,n=!1){let r,l;const a=re(e);return a?(r=e,l=ot):(r=e.get,l=e.set),new Pi(r,l,a||!l,n)}function Za(e){var t;Zt&&pn&&(e=ie(e),bi(pn,(t=e.dep)!=null?t:e.dep=wi(()=>e.dep=void 0,e instanceof Pi?e:void 0)))}function lr(e,t=4,n){e=ie(e);const r=e.dep;r&&xi(r,t)}function He(e){return!!(e&&e.__v_isRef===!0)}function W(e){return Mi(e,!1)}function Te(e){return Mi(e,!0)}function Mi(e,t){return He(e)?e:new k1(e,t)}class k1{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:ie(t),this._value=n?t:fr(t)}get value(){return Za(this),this._value}set value(t){const n=this.__v_isShallow||al(t)||jn(t);t=n?t:ie(t),Xt(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:fr(t),lr(this,4))}}function hn(e){return He(e)?e.value:e}const E1={get:(e,t,n)=>hn(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const l=e[t];return He(l)&&!He(n)?(l.value=n,!0):Reflect.set(e,t,n,r)}};function Ri(e){return Mn(e)?e:new Proxy(e,E1)}class C1{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:n,set:r}=t(()=>Za(this),()=>lr(this));this._get=n,this._set=r}get value(){return this._get()}set value(t){this._set(t)}}function Oi(e){return new C1(e)}class T1{constructor(t,n,r){this._object=t,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return r1(ie(this._object),this._key)}}class L1{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Un(e,t,n){return He(e)?e:re(e)?new L1(e):Ae(e)&&arguments.length>1?S1(e,t,n):W(e)}function S1(e,t,n){const r=e[t];return He(r)?r:new T1(e,t,n)}/**
* @vue/runtime-core v3.4.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Yt(e,t,n,r){let l;try{l=r?e(...r):e()}catch(a){Lr(a,t,n)}return l}function ct(e,t,n,r){if(re(e)){const a=Yt(e,t,n,r);return a&&fi(a)&&a.catch(s=>{Lr(s,t,n)}),a}const l=[];for(let a=0;a<e.length;a++)l.push(ct(e[a],t,n,r));return l}function Lr(e,t,n,r=!0){const l=t?t.vnode:null;if(t){let a=t.parent;const s=t.proxy,i=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const c=a.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](e,s,i)===!1)return}a=a.parent}const u=t.appContext.config.errorHandler;if(u){Yt(u,null,10,[e,s,i]);return}}A1(e,n,l,r)}function A1(e,t,n,r=!0){console.error(e)}let hr=!1,pa=!1;const ze=[];let kt=0;const Rn=[];let Gt=null,cn=0;const $i=Promise.resolve();let Ya=null;function Ot(e){const t=Ya||$i;return e?t.then(this?e.bind(this):e):t}function I1(e){let t=kt+1,n=ze.length;for(;t<n;){const r=t+n>>>1,l=ze[r],a=gr(l);a<e||a===e&&l.pre?t=r+1:n=r}return t}function bl(e){(!ze.length||!ze.includes(e,hr&&e.allowRecurse?kt+1:kt))&&(e.id==null?ze.push(e):ze.splice(I1(e.id),0,e),Di())}function Di(){!hr&&!pa&&(pa=!0,Ya=$i.then(Ni))}function P1(e){const t=ze.indexOf(e);t>kt&&ze.splice(t,1)}function M1(e){ne(e)?Rn.push(...e):(!Gt||!Gt.includes(e,e.allowRecurse?cn+1:cn))&&Rn.push(e),Di()}function Ws(e,t,n=hr?kt+1:0){for(;n<ze.length;n++){const r=ze[n];if(r&&r.pre){if(e&&r.id!==e.uid)continue;ze.splice(n,1),n--,r()}}}function sl(e){if(Rn.length){const t=[...new Set(Rn)].sort((n,r)=>gr(n)-gr(r));if(Rn.length=0,Gt){Gt.push(...t);return}for(Gt=t,cn=0;cn<Gt.length;cn++)Gt[cn]();Gt=null,cn=0}}const gr=e=>e.id==null?1/0:e.id,R1=(e,t)=>{const n=gr(e)-gr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Ni(e){pa=!1,hr=!0,ze.sort(R1);try{for(kt=0;kt<ze.length;kt++){const t=ze[kt];t&&t.active!==!1&&Yt(t,null,14)}}finally{kt=0,ze.length=0,sl(),hr=!1,Ya=null,(ze.length||Rn.length)&&Ni()}}function O1(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Ee;let l=n;const a=t.startsWith("update:"),s=a&&t.slice(7);if(s&&s in r){const d=`${s==="modelValue"?"model":s}Modifiers`,{number:p,trim:f}=r[d]||Ee;f&&(l=n.map(h=>Ve(h)?h.trim():h)),p&&(l=n.map(Wd))}let i,u=r[i=$l(t)]||r[i=$l(Ze(t))];!u&&a&&(u=r[i=$l(Gn(t))]),u&&ct(u,e,6,l);const c=r[i+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[i])return;e.emitted[i]=!0,ct(c,e,6,l)}}function ji(e,t,n=!1){const r=t.emitsCache,l=r.get(e);if(l!==void 0)return l;const a=e.emits;let s={},i=!1;if(!re(e)){const u=c=>{const d=ji(c,t,!0);d&&(i=!0,$e(s,d))};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}return!a&&!i?(Ae(e)&&r.set(e,null),null):(ne(a)?a.forEach(u=>s[u]=null):$e(s,a),Ae(e)&&r.set(e,s),s)}function xl(e,t){return!e||!Cr(t)?!1:(t=t.slice(2).replace(/Once$/,""),de(e,t[0].toLowerCase()+t.slice(1))||de(e,Gn(t))||de(e,t))}let it=null,Vi=null;function ol(e){const t=it;return it=e,Vi=e&&e.type.__scopeId||null,t}function $1(e,t=it,n){if(!t||e._n)return e;const r=(...l)=>{r._d&&ro(-1);const a=ol(t);let s;try{s=e(...l)}finally{ol(a),r._d&&ro(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function Nl(e){const{type:t,vnode:n,proxy:r,withProxy:l,props:a,propsOptions:[s],slots:i,attrs:u,emit:c,render:d,renderCache:p,data:f,setupState:h,ctx:v,inheritAttrs:w}=e;let _,y;const S=ol(e);try{if(n.shapeFlag&4){const C=l||r,D=C;_=mt(d.call(D,C,p,a,h,f,v)),y=u}else{const C=t;_=mt(C.length>1?C(a,{attrs:u,slots:i,emit:c}):C(a,null)),y=t.props?u:D1(u)}}catch(C){cr.length=0,Lr(C,e,1),_=Ie(pt)}let b=_;if(y&&w!==!1){const C=Object.keys(y),{shapeFlag:D}=b;C.length&&D&7&&(s&&C.some(Na)&&(y=N1(y,s)),b=Jt(b,y))}return n.dirs&&(b=Jt(b),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&(b.transition=n.transition),_=b,ol(S),_}const D1=e=>{let t;for(const n in e)(n==="class"||n==="style"||Cr(n))&&((t||(t={}))[n]=e[n]);return t},N1=(e,t)=>{const n={};for(const r in e)(!Na(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function j1(e,t,n){const{props:r,children:l,component:a}=e,{props:s,children:i,patchFlag:u}=t,c=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&u>=0){if(u&1024)return!0;if(u&16)return r?Us(r,s,c):!!s;if(u&8){const d=t.dynamicProps;for(let p=0;p<d.length;p++){const f=d[p];if(s[f]!==r[f]&&!xl(c,f))return!0}}}else return(l||i)&&(!i||!i.$stable)?!0:r===s?!1:r?s?Us(r,s,c):!0:!!s;return!1}function Us(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let l=0;l<r.length;l++){const a=r[l];if(t[a]!==e[a]&&!xl(n,a))return!0}return!1}function V1({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const Hi="components";function ut(e,t){return z1(Hi,e,!0,t)||e}const H1=Symbol.for("v-ndc");function z1(e,t,n=!0,r=!1){const l=it||je;if(l){const a=l.type;if(e===Hi){const i=Dp(a,!1);if(i&&(i===t||i===Ze(t)||i===Wn(Ze(t))))return a}const s=qs(l[e]||a[e],t)||qs(l.appContext[e],t);return!s&&r?a:s}}function qs(e,t){return e&&(e[t]||e[Ze(t)]||e[Wn(Ze(t))])}const B1=e=>e.__isSuspense;function zi(e,t){t&&t.pendingBranch?ne(e)?t.effects.push(...e):t.effects.push(e):M1(e)}const F1=Symbol.for("v-scx"),G1=()=>me(F1);function Bi(e,t){return Xa(e,null,t)}const Wr={};function le(e,t,n){return Xa(e,t,n)}function Xa(e,t,{immediate:n,deep:r,flush:l,once:a,onTrack:s,onTrigger:i}=Ee){if(t&&a){const E=t;t=(...q)=>{E(...q),D()}}const u=je,c=E=>r===!0?E:Sn(E,r===!1?1:void 0);let d,p=!1,f=!1;if(He(e)?(d=()=>e.value,p=al(e)):Mn(e)?(d=()=>c(e),p=!0):ne(e)?(f=!0,p=e.some(E=>Mn(E)||al(E)),d=()=>e.map(E=>{if(He(E))return E.value;if(Mn(E))return c(E);if(re(E))return Yt(E,u,2)})):re(e)?t?d=()=>Yt(e,u,2):d=()=>(h&&h(),ct(e,u,3,[v])):d=ot,t&&r){const E=d;d=()=>Sn(E())}let h,v=E=>{h=b.onStop=()=>{Yt(E,u,4),h=b.onStop=void 0}},w;if(Ir)if(v=ot,t?n&&ct(t,u,3,[d(),f?[]:void 0,v]):d(),l==="sync"){const E=G1();w=E.__watcherHandles||(E.__watcherHandles=[])}else return ot;let _=f?new Array(e.length).fill(Wr):Wr;const y=()=>{if(!(!b.active||!b.dirty))if(t){const E=b.run();(r||p||(f?E.some((q,N)=>Xt(q,_[N])):Xt(E,_)))&&(h&&h(),ct(t,u,3,[E,_===Wr?void 0:f&&_[0]===Wr?[]:_,v]),_=E)}else b.run()};y.allowRecurse=!!t;let S;l==="sync"?S=y:l==="post"?S=()=>We(y,u&&u.suspense):(y.pre=!0,u&&(y.id=u.uid),S=()=>bl(y));const b=new Ba(d,ot,S),C=mi(),D=()=>{b.stop(),C&&ja(C.effects,b)};return t?n?y():_=b.run():l==="post"?We(b.run.bind(b),u&&u.suspense):b.run(),w&&w.push(D),D}function W1(e,t,n){const r=this.proxy,l=Ve(e)?e.includes(".")?Fi(r,e):()=>r[e]:e.bind(r,r);let a;re(t)?a=t:(a=t.handler,n=t);const s=Ar(this),i=Xa(l,a.bind(r),n);return s(),i}function Fi(e,t){const n=t.split(".");return()=>{let r=e;for(let l=0;l<n.length&&r;l++)r=r[n[l]];return r}}function Sn(e,t,n=0,r){if(!Ae(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++}if(r=r||new Set,r.has(e))return e;if(r.add(e),He(e))Sn(e.value,t,n,r);else if(ne(e))for(let l=0;l<e.length;l++)Sn(e[l],t,n,r);else if(Vd(e)||rr(e))e.forEach(l=>{Sn(l,t,n,r)});else if(Bd(e))for(const l in e)Sn(e[l],t,n,r);return e}function _t(e,t,n,r){const l=e.dirs,a=t&&t.dirs;for(let s=0;s<l.length;s++){const i=l[s];a&&(i.oldValue=a[s].value);let u=i.dir[r];u&&(mn(),ct(u,n,8,[e.el,i,e,t]),vn())}}const Wt=Symbol("_leaveCb"),Ur=Symbol("_enterCb");function Gi(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fe(()=>{e.isMounted=!0}),Yi(()=>{e.isUnmounting=!0}),e}const lt=[Function,Array],Wi={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:lt,onEnter:lt,onAfterEnter:lt,onEnterCancelled:lt,onBeforeLeave:lt,onLeave:lt,onAfterLeave:lt,onLeaveCancelled:lt,onBeforeAppear:lt,onAppear:lt,onAfterAppear:lt,onAppearCancelled:lt},U1={name:"BaseTransition",props:Wi,setup(e,{slots:t}){const n=bn(),r=Gi();let l;return()=>{const a=t.default&&Ja(t.default(),!0);if(!a||!a.length)return;let s=a[0];if(a.length>1){for(const w of a)if(w.type!==pt){s=w;break}}const i=ie(e),{mode:u}=i;if(r.isLeaving)return jl(s);const c=Ks(s);if(!c)return jl(s);const d=mr(c,i,r,n);vr(c,d);const p=n.subTree,f=p&&Ks(p);let h=!1;const{getTransitionKey:v}=c.type;if(v){const w=v();l===void 0?l=w:w!==l&&(l=w,h=!0)}if(f&&f.type!==pt&&(!un(c,f)||h)){const w=mr(f,i,r,n);if(vr(f,w),u==="out-in")return r.isLeaving=!0,w.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&(n.effect.dirty=!0,n.update())},jl(s);u==="in-out"&&c.type!==pt&&(w.delayLeave=(_,y,S)=>{const b=Ui(r,f);b[String(f.key)]=f,_[Wt]=()=>{y(),_[Wt]=void 0,delete d.delayedLeave},d.delayedLeave=S})}return s}}},q1=U1;function Ui(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function mr(e,t,n,r){const{appear:l,mode:a,persisted:s=!1,onBeforeEnter:i,onEnter:u,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:p,onLeave:f,onAfterLeave:h,onLeaveCancelled:v,onBeforeAppear:w,onAppear:_,onAfterAppear:y,onAppearCancelled:S}=t,b=String(e.key),C=Ui(n,e),D=(N,$)=>{N&&ct(N,r,9,$)},E=(N,$)=>{const V=$[1];D(N,$),ne(N)?N.every(Y=>Y.length<=1)&&V():N.length<=1&&V()},q={mode:a,persisted:s,beforeEnter(N){let $=i;if(!n.isMounted)if(l)$=w||i;else return;N[Wt]&&N[Wt](!0);const V=C[b];V&&un(e,V)&&V.el[Wt]&&V.el[Wt](),D($,[N])},enter(N){let $=u,V=c,Y=d;if(!n.isMounted)if(l)$=_||u,V=y||c,Y=S||d;else return;let H=!1;const Q=N[Ur]=Le=>{H||(H=!0,Le?D(Y,[N]):D(V,[N]),q.delayedLeave&&q.delayedLeave(),N[Ur]=void 0)};$?E($,[N,Q]):Q()},leave(N,$){const V=String(e.key);if(N[Ur]&&N[Ur](!0),n.isUnmounting)return $();D(p,[N]);let Y=!1;const H=N[Wt]=Q=>{Y||(Y=!0,$(),Q?D(v,[N]):D(h,[N]),N[Wt]=void 0,C[V]===e&&delete C[V])};C[V]=e,f?E(f,[N,H]):H()},clone(N){return mr(N,t,n,r)}};return q}function jl(e){if(Sr(e))return e=Jt(e),e.children=null,e}function Ks(e){return Sr(e)?e.children?e.children[0]:void 0:e}function vr(e,t){e.shapeFlag&6&&e.component?vr(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ja(e,t=!1,n){let r=[],l=0;for(let a=0;a<e.length;a++){let s=e[a];const i=n==null?s.key:String(n)+String(s.key!=null?s.key:a);s.type===et?(s.patchFlag&128&&l++,r=r.concat(Ja(s.children,t,i))):(t||s.type!==pt)&&r.push(i!=null?Jt(s,{key:i}):s)}if(l>1)for(let a=0;a<r.length;a++)r[a].patchFlag=-2;return r}/*! #__NO_SIDE_EFFECTS__ */function R(e,t){return re(e)?$e({name:e.name},t,{setup:e}):e}const ar=e=>!!e.type.__asyncLoader;/*! #__NO_SIDE_EFFECTS__ */function qi(e){re(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:r,delay:l=200,timeout:a,suspensible:s=!0,onError:i}=e;let u=null,c,d=0;const p=()=>(d++,u=null,f()),f=()=>{let h;return u||(h=u=t().catch(v=>{if(v=v instanceof Error?v:new Error(String(v)),i)return new Promise((w,_)=>{i(v,()=>w(p()),()=>_(v),d+1)});throw v}).then(v=>h!==u&&u?u:(v&&(v.__esModule||v[Symbol.toStringTag]==="Module")&&(v=v.default),c=v,v)))};return R({name:"AsyncComponentWrapper",__asyncLoader:f,get __asyncResolved(){return c},setup(){const h=je;if(c)return()=>Vl(c,h);const v=S=>{u=null,Lr(S,h,13,!r)};if(s&&h.suspense||Ir)return f().then(S=>()=>Vl(S,h)).catch(S=>(v(S),()=>r?Ie(r,{error:S}):null));const w=W(!1),_=W(),y=W(!!l);return l&&setTimeout(()=>{y.value=!1},l),a!=null&&setTimeout(()=>{if(!w.value&&!_.value){const S=new Error(`Async component timed out after ${a}ms.`);v(S),_.value=S}},a),f().then(()=>{w.value=!0,h.parent&&Sr(h.parent.vnode)&&(h.parent.effect.dirty=!0,bl(h.parent.update))}).catch(S=>{v(S),_.value=S}),()=>{if(w.value&&c)return Vl(c,h);if(_.value&&r)return Ie(r,{error:_.value});if(n&&!y.value)return Ie(n)}}})}function Vl(e,t){const{ref:n,props:r,children:l,ce:a}=t.vnode,s=Ie(e,r,l);return s.ref=n,s.ce=a,delete t.vnode.ce,s}const Sr=e=>e.type.__isKeepAlive;function K1(e,t){Ki(e,"a",t)}function Z1(e,t){Ki(e,"da",t)}function Ki(e,t,n=je){const r=e.__wdc||(e.__wdc=()=>{let l=n;for(;l;){if(l.isDeactivated)return;l=l.parent}return e()});if(wl(t,r,n),n){let l=n.parent;for(;l&&l.parent;)Sr(l.parent.vnode)&&Y1(r,t,n,l),l=l.parent}}function Y1(e,t,n,r){const l=wl(t,e,r,!0);yn(()=>{ja(r[t],l)},n)}function wl(e,t,n=je,r=!1){if(n){const l=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;mn();const i=Ar(n),u=ct(t,n,e,s);return i(),vn(),u});return r?l.unshift(a):l.push(a),a}}const $t=e=>(t,n=je)=>(!Ir||e==="sp")&&wl(e,(...r)=>t(...r),n),X1=$t("bm"),fe=$t("m"),J1=$t("bu"),Zi=$t("u"),Yi=$t("bum"),yn=$t("um"),Q1=$t("sp"),ep=$t("rtg"),tp=$t("rtc");function np(e,t=je){wl("ec",e,t)}const fa=e=>e?dc(e)?ns(e)||e.proxy:fa(e.parent):null,sr=$e(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>fa(e.parent),$root:e=>fa(e.root),$emit:e=>e.emit,$options:e=>Qa(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,bl(e.update)}),$nextTick:e=>e.n||(e.n=Ot.bind(e.proxy)),$watch:e=>W1.bind(e)}),Hl=(e,t)=>e!==Ee&&!e.__isScriptSetup&&de(e,t),rp={get({_:e},t){const{ctx:n,setupState:r,data:l,props:a,accessCache:s,type:i,appContext:u}=e;let c;if(t[0]!=="$"){const h=s[t];if(h!==void 0)switch(h){case 1:return r[t];case 2:return l[t];case 4:return n[t];case 3:return a[t]}else{if(Hl(r,t))return s[t]=1,r[t];if(l!==Ee&&de(l,t))return s[t]=2,l[t];if((c=e.propsOptions[0])&&de(c,t))return s[t]=3,a[t];if(n!==Ee&&de(n,t))return s[t]=4,n[t];ha&&(s[t]=0)}}const d=sr[t];let p,f;if(d)return t==="$attrs"&&Ye(e,"get",t),d(e);if((p=i.__cssModules)&&(p=p[t]))return p;if(n!==Ee&&de(n,t))return s[t]=4,n[t];if(f=u.config.globalProperties,de(f,t))return f[t]},set({_:e},t,n){const{data:r,setupState:l,ctx:a}=e;return Hl(l,t)?(l[t]=n,!0):r!==Ee&&de(r,t)?(r[t]=n,!0):de(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:l,propsOptions:a}},s){let i;return!!n[s]||e!==Ee&&de(e,s)||Hl(t,s)||(i=a[0])&&de(i,s)||de(r,s)||de(sr,s)||de(l.config.globalProperties,s)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:de(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Zs(e){return ne(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let ha=!0;function lp(e){const t=Qa(e),n=e.proxy,r=e.ctx;ha=!1,t.beforeCreate&&Ys(t.beforeCreate,e,"bc");const{data:l,computed:a,methods:s,watch:i,provide:u,inject:c,created:d,beforeMount:p,mounted:f,beforeUpdate:h,updated:v,activated:w,deactivated:_,beforeDestroy:y,beforeUnmount:S,destroyed:b,unmounted:C,render:D,renderTracked:E,renderTriggered:q,errorCaptured:N,serverPrefetch:$,expose:V,inheritAttrs:Y,components:H,directives:Q,filters:Le}=t;if(c&&ap(c,r,null),s)for(const ee in s){const K=s[ee];re(K)&&(r[ee]=K.bind(n))}if(l){const ee=l.call(n,n);Ae(ee)&&(e.data=Tr(ee))}if(ha=!0,a)for(const ee in a){const K=a[ee],Re=re(K)?K.bind(n,n):re(K.get)?K.get.bind(n,n):ot,bt=!re(K)&&re(K.set)?K.set.bind(n):ot,rt=x({get:Re,set:bt});Object.defineProperty(r,ee,{enumerable:!0,configurable:!0,get:()=>rt.value,set:De=>rt.value=De})}if(i)for(const ee in i)Xi(i[ee],r,n,ee);if(u){const ee=re(u)?u.call(n):u;Reflect.ownKeys(ee).forEach(K=>{dt(K,ee[K])})}d&&Ys(d,e,"c");function U(ee,K){ne(K)?K.forEach(Re=>ee(Re.bind(n))):K&&ee(K.bind(n))}if(U(X1,p),U(fe,f),U(J1,h),U(Zi,v),U(K1,w),U(Z1,_),U(np,N),U(tp,E),U(ep,q),U(Yi,S),U(yn,C),U(Q1,$),ne(V))if(V.length){const ee=e.exposed||(e.exposed={});V.forEach(K=>{Object.defineProperty(ee,K,{get:()=>n[K],set:Re=>n[K]=Re})})}else e.exposed||(e.exposed={});D&&e.render===ot&&(e.render=D),Y!=null&&(e.inheritAttrs=Y),H&&(e.components=H),Q&&(e.directives=Q)}function ap(e,t,n=ot){ne(e)&&(e=ga(e));for(const r in e){const l=e[r];let a;Ae(l)?"default"in l?a=me(l.from||r,l.default,!0):a=me(l.from||r):a=me(l),He(a)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>a.value,set:s=>a.value=s}):t[r]=a}}function Ys(e,t,n){ct(ne(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Xi(e,t,n,r){const l=r.includes(".")?Fi(n,r):()=>n[r];if(Ve(e)){const a=t[e];re(a)&&le(l,a)}else if(re(e))le(l,e.bind(n));else if(Ae(e))if(ne(e))e.forEach(a=>Xi(a,t,n,r));else{const a=re(e.handler)?e.handler.bind(n):t[e.handler];re(a)&&le(l,a,e)}}function Qa(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:l,optionsCache:a,config:{optionMergeStrategies:s}}=e.appContext,i=a.get(t);let u;return i?u=i:!l.length&&!n&&!r?u=t:(u={},l.length&&l.forEach(c=>il(u,c,s,!0)),il(u,t,s)),Ae(t)&&a.set(t,u),u}function il(e,t,n,r=!1){const{mixins:l,extends:a}=t;a&&il(e,a,n,!0),l&&l.forEach(s=>il(e,s,n,!0));for(const s in t)if(!(r&&s==="expose")){const i=sp[s]||n&&n[s];e[s]=i?i(e[s],t[s]):t[s]}return e}const sp={data:Xs,props:Js,emits:Js,methods:tr,computed:tr,beforeCreate:Fe,created:Fe,beforeMount:Fe,mounted:Fe,beforeUpdate:Fe,updated:Fe,beforeDestroy:Fe,beforeUnmount:Fe,destroyed:Fe,unmounted:Fe,activated:Fe,deactivated:Fe,errorCaptured:Fe,serverPrefetch:Fe,components:tr,directives:tr,watch:ip,provide:Xs,inject:op};function Xs(e,t){return t?e?function(){return $e(re(e)?e.call(this,this):e,re(t)?t.call(this,this):t)}:t:e}function op(e,t){return tr(ga(e),ga(t))}function ga(e){if(ne(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Fe(e,t){return e?[...new Set([].concat(e,t))]:t}function tr(e,t){return e?$e(Object.create(null),e,t):t}function Js(e,t){return e?ne(e)&&ne(t)?[...new Set([...e,...t])]:$e(Object.create(null),Zs(e),Zs(t??{})):t}function ip(e,t){if(!e)return t;if(!t)return e;const n=$e(Object.create(null),e);for(const r in t)n[r]=Fe(e[r],t[r]);return n}function Ji(){return{app:null,config:{isNativeTag:Nd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let cp=0;function up(e,t){return function(r,l=null){re(r)||(r=$e({},r)),l!=null&&!Ae(l)&&(l=null);const a=Ji(),s=new WeakSet;let i=!1;const u=a.app={_uid:cp++,_component:r,_props:l,_container:null,_context:a,_instance:null,version:jp,get config(){return a.config},set config(c){},use(c,...d){return s.has(c)||(c&&re(c.install)?(s.add(c),c.install(u,...d)):re(c)&&(s.add(c),c(u,...d))),u},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),u},component(c,d){return d?(a.components[c]=d,u):a.components[c]},directive(c,d){return d?(a.directives[c]=d,u):a.directives[c]},mount(c,d,p){if(!i){const f=Ie(r,l);return f.appContext=a,p===!0?p="svg":p===!1&&(p=void 0),d&&t?t(f,c):e(f,c,p),i=!0,u._container=c,c.__vue_app__=u,ns(f.component)||f.component.proxy}},unmount(){i&&(e(null,u._container),delete u._container.__vue_app__)},provide(c,d){return a.provides[c]=d,u},runWithContext(c){const d=or;or=u;try{return c()}finally{or=d}}};return u}}let or=null;function dt(e,t){if(je){let n=je.provides;const r=je.parent&&je.parent.provides;r===n&&(n=je.provides=Object.create(r)),n[e]=t}}function me(e,t,n=!1){const r=je||it;if(r||or){const l=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:or._context.provides;if(l&&e in l)return l[e];if(arguments.length>1)return n&&re(t)?t.call(r&&r.proxy):t}}function dp(e,t,n,r=!1){const l={},a={};rl(a,_l,1),e.propsDefaults=Object.create(null),Qi(e,t,l,a);for(const s in e.propsOptions[0])s in l||(l[s]=void 0);n?e.props=r?l:Si(l):e.type.props?e.props=l:e.props=a,e.attrs=a}function pp(e,t,n,r){const{props:l,attrs:a,vnode:{patchFlag:s}}=e,i=ie(l),[u]=e.propsOptions;let c=!1;if((r||s>0)&&!(s&16)){if(s&8){const d=e.vnode.dynamicProps;for(let p=0;p<d.length;p++){let f=d[p];if(xl(e.emitsOptions,f))continue;const h=t[f];if(u)if(de(a,f))h!==a[f]&&(a[f]=h,c=!0);else{const v=Ze(f);l[v]=ma(u,i,v,h,e,!1)}else h!==a[f]&&(a[f]=h,c=!0)}}}else{Qi(e,t,l,a)&&(c=!0);let d;for(const p in i)(!t||!de(t,p)&&((d=Gn(p))===p||!de(t,d)))&&(u?n&&(n[p]!==void 0||n[d]!==void 0)&&(l[p]=ma(u,i,p,void 0,e,!0)):delete l[p]);if(a!==i)for(const p in a)(!t||!de(t,p))&&(delete a[p],c=!0)}c&&Mt(e,"set","$attrs")}function Qi(e,t,n,r){const[l,a]=e.propsOptions;let s=!1,i;if(t)for(let u in t){if(Pn(u))continue;const c=t[u];let d;l&&de(l,d=Ze(u))?!a||!a.includes(d)?n[d]=c:(i||(i={}))[d]=c:xl(e.emitsOptions,u)||(!(u in r)||c!==r[u])&&(r[u]=c,s=!0)}if(a){const u=ie(n),c=i||Ee;for(let d=0;d<a.length;d++){const p=a[d];n[p]=ma(l,u,p,c[p],e,!de(c,p))}}return s}function ma(e,t,n,r,l,a){const s=e[n];if(s!=null){const i=de(s,"default");if(i&&r===void 0){const u=s.default;if(s.type!==Function&&!s.skipFactory&&re(u)){const{propsDefaults:c}=l;if(n in c)r=c[n];else{const d=Ar(l);r=c[n]=u.call(null,t),d()}}else r=u}s[0]&&(a&&!i?r=!1:s[1]&&(r===""||r===Gn(n))&&(r=!0))}return r}function ec(e,t,n=!1){const r=t.propsCache,l=r.get(e);if(l)return l;const a=e.props,s={},i=[];let u=!1;if(!re(e)){const d=p=>{u=!0;const[f,h]=ec(p,t,!0);$e(s,f),h&&i.push(...h)};!n&&t.mixins.length&&t.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}if(!a&&!u)return Ae(e)&&r.set(e,In),In;if(ne(a))for(let d=0;d<a.length;d++){const p=Ze(a[d]);Qs(p)&&(s[p]=Ee)}else if(a)for(const d in a){const p=Ze(d);if(Qs(p)){const f=a[d],h=s[p]=ne(f)||re(f)?{type:f}:$e({},f);if(h){const v=no(Boolean,h.type),w=no(String,h.type);h[0]=v>-1,h[1]=w<0||v<w,(v>-1||de(h,"default"))&&i.push(p)}}}const c=[s,i];return Ae(e)&&r.set(e,c),c}function Qs(e){return e[0]!=="$"&&!Pn(e)}function eo(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function to(e,t){return eo(e)===eo(t)}function no(e,t){return ne(t)?t.findIndex(n=>to(n,e)):re(t)&&to(t,e)?0:-1}const tc=e=>e[0]==="_"||e==="$stable",es=e=>ne(e)?e.map(mt):[mt(e)],fp=(e,t,n)=>{if(t._n)return t;const r=$1((...l)=>es(t(...l)),n);return r._c=!1,r},nc=(e,t,n)=>{const r=e._ctx;for(const l in e){if(tc(l))continue;const a=e[l];if(re(a))t[l]=fp(l,a,r);else if(a!=null){const s=es(a);t[l]=()=>s}}},rc=(e,t)=>{const n=es(t);e.slots.default=()=>n},hp=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=ie(t),rl(t,"_",n)):nc(t,e.slots={})}else e.slots={},t&&rc(e,t);rl(e.slots,_l,1)},gp=(e,t,n)=>{const{vnode:r,slots:l}=e;let a=!0,s=Ee;if(r.shapeFlag&32){const i=t._;i?n&&i===1?a=!1:($e(l,t),!n&&i===1&&delete l._):(a=!t.$stable,nc(t,l)),s=t}else t&&(rc(e,t),s={default:1});if(a)for(const i in l)!tc(i)&&s[i]==null&&delete l[i]};function cl(e,t,n,r,l=!1){if(ne(e)){e.forEach((f,h)=>cl(f,t&&(ne(t)?t[h]:t),n,r,l));return}if(ar(r)&&!l)return;const a=r.shapeFlag&4?ns(r.component)||r.component.proxy:r.el,s=l?null:a,{i,r:u}=e,c=t&&t.r,d=i.refs===Ee?i.refs={}:i.refs,p=i.setupState;if(c!=null&&c!==u&&(Ve(c)?(d[c]=null,de(p,c)&&(p[c]=null)):He(c)&&(c.value=null)),re(u))Yt(u,i,12,[s,d]);else{const f=Ve(u),h=He(u);if(f||h){const v=()=>{if(e.f){const w=f?de(p,u)?p[u]:d[u]:u.value;l?ne(w)&&ja(w,a):ne(w)?w.includes(a)||w.push(a):f?(d[u]=[a],de(p,u)&&(p[u]=d[u])):(u.value=[a],e.k&&(d[e.k]=u.value))}else f?(d[u]=s,de(p,u)&&(p[u]=s)):h&&(u.value=s,e.k&&(d[e.k]=s))};s?(v.id=-1,We(v,n)):v()}}}let Vt=!1;const mp=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",vp=e=>e.namespaceURI.includes("MathML"),qr=e=>{if(mp(e))return"svg";if(vp(e))return"mathml"},Kr=e=>e.nodeType===8;function yp(e){const{mt:t,p:n,o:{patchProp:r,createText:l,nextSibling:a,parentNode:s,remove:i,insert:u,createComment:c}}=e,d=(b,C)=>{if(!C.hasChildNodes()){n(null,b,C),sl(),C._vnode=b;return}Vt=!1,p(C.firstChild,b,null,null,null),sl(),C._vnode=b,Vt&&console.error("Hydration completed but contains mismatches.")},p=(b,C,D,E,q,N=!1)=>{const $=Kr(b)&&b.data==="[",V=()=>w(b,C,D,E,q,$),{type:Y,ref:H,shapeFlag:Q,patchFlag:Le}=C;let _e=b.nodeType;C.el=b,Le===-2&&(N=!1,C.dynamicChildren=null);let U=null;switch(Y){case Vn:_e!==3?C.children===""?(u(C.el=l(""),s(b),b),U=b):U=V():(b.data!==C.children&&(Vt=!0,b.data=C.children),U=a(b));break;case pt:S(b)?(U=a(b),y(C.el=b.content.firstChild,b,D)):_e!==8||$?U=V():U=a(b);break;case ir:if($&&(b=a(b),_e=b.nodeType),_e===1||_e===3){U=b;const ee=!C.children.length;for(let K=0;K<C.staticCount;K++)ee&&(C.children+=U.nodeType===1?U.outerHTML:U.data),K===C.staticCount-1&&(C.anchor=U),U=a(U);return $?a(U):U}else V();break;case et:$?U=v(b,C,D,E,q,N):U=V();break;default:if(Q&1)(_e!==1||C.type.toLowerCase()!==b.tagName.toLowerCase())&&!S(b)?U=V():U=f(b,C,D,E,q,N);else if(Q&6){C.slotScopeIds=q;const ee=s(b);if($?U=_(b):Kr(b)&&b.data==="teleport start"?U=_(b,b.data,"teleport end"):U=a(b),t(C,ee,null,D,E,qr(ee),N),ar(C)){let K;$?(K=Ie(et),K.anchor=U?U.previousSibling:ee.lastChild):K=b.nodeType===3?uc(""):Ie("div"),K.el=b,C.component.subTree=K}}else Q&64?_e!==8?U=V():U=C.type.hydrate(b,C,D,E,q,N,e,h):Q&128&&(U=C.type.hydrate(b,C,D,E,qr(s(b)),q,N,e,p))}return H!=null&&cl(H,null,E,C),U},f=(b,C,D,E,q,N)=>{N=N||!!C.dynamicChildren;const{type:$,props:V,patchFlag:Y,shapeFlag:H,dirs:Q,transition:Le}=C,_e=$==="input"||$==="option";if(_e||Y!==-1){Q&&_t(C,null,D,"created");let U=!1;if(S(b)){U=lc(E,Le)&&D&&D.vnode.props&&D.vnode.props.appear;const K=b.content.firstChild;U&&Le.beforeEnter(K),y(K,b,D),C.el=b=K}if(H&16&&!(V&&(V.innerHTML||V.textContent))){let K=h(b.firstChild,C,b,D,E,q,N);for(;K;){Vt=!0;const Re=K;K=K.nextSibling,i(Re)}}else H&8&&b.textContent!==C.children&&(Vt=!0,b.textContent=C.children);if(V)if(_e||!N||Y&48)for(const K in V)(_e&&(K.endsWith("value")||K==="indeterminate")||Cr(K)&&!Pn(K)||K[0]===".")&&r(b,K,null,V[K],void 0,void 0,D);else V.onClick&&r(b,"onClick",null,V.onClick,void 0,void 0,D);let ee;(ee=V&&V.onVnodeBeforeMount)&&at(ee,D,C),Q&&_t(C,null,D,"beforeMount"),((ee=V&&V.onVnodeMounted)||Q||U)&&zi(()=>{ee&&at(ee,D,C),U&&Le.enter(b),Q&&_t(C,null,D,"mounted")},E)}return b.nextSibling},h=(b,C,D,E,q,N,$)=>{$=$||!!C.dynamicChildren;const V=C.children,Y=V.length;for(let H=0;H<Y;H++){const Q=$?V[H]:V[H]=mt(V[H]);if(b)b=p(b,Q,E,q,N,$);else{if(Q.type===Vn&&!Q.children)continue;Vt=!0,n(null,Q,D,null,E,q,qr(D),N)}}return b},v=(b,C,D,E,q,N)=>{const{slotScopeIds:$}=C;$&&(q=q?q.concat($):$);const V=s(b),Y=h(a(b),C,V,D,E,q,N);return Y&&Kr(Y)&&Y.data==="]"?a(C.anchor=Y):(Vt=!0,u(C.anchor=c("]"),V,Y),Y)},w=(b,C,D,E,q,N)=>{if(Vt=!0,C.el=null,N){const Y=_(b);for(;;){const H=a(b);if(H&&H!==Y)i(H);else break}}const $=a(b),V=s(b);return i(b),n(null,C,V,$,D,E,qr(V),q),$},_=(b,C="[",D="]")=>{let E=0;for(;b;)if(b=a(b),b&&Kr(b)&&(b.data===C&&E++,b.data===D)){if(E===0)return a(b);E--}return b},y=(b,C,D)=>{const E=C.parentNode;E&&E.replaceChild(b,C);let q=D;for(;q;)q.vnode.el===C&&(q.vnode.el=q.subTree.el=b),q=q.parent},S=b=>b.nodeType===1&&b.tagName.toLowerCase()==="template";return[d,p]}const We=zi;function bp(e){return xp(e,yp)}function xp(e,t){const n=hi();n.__VUE__=!0;const{insert:r,remove:l,patchProp:a,createElement:s,createText:i,createComment:u,setText:c,setElementText:d,parentNode:p,nextSibling:f,setScopeId:h=ot,insertStaticContent:v}=e,w=(g,m,k,I=null,L=null,O=null,B=void 0,M=null,j=!!m.dynamicChildren)=>{if(g===m)return;g&&!un(g,m)&&(I=T(g),De(g,L,O,!0),g=null),m.patchFlag===-2&&(j=!1,m.dynamicChildren=null);const{type:P,ref:G,shapeFlag:J}=m;switch(P){case Vn:_(g,m,k,I);break;case pt:y(g,m,k,I);break;case ir:g==null&&S(m,k,I,B);break;case et:H(g,m,k,I,L,O,B,M,j);break;default:J&1?D(g,m,k,I,L,O,B,M,j):J&6?Q(g,m,k,I,L,O,B,M,j):(J&64||J&128)&&P.process(g,m,k,I,L,O,B,M,j,Z)}G!=null&&L&&cl(G,g&&g.ref,O,m||g,!m)},_=(g,m,k,I)=>{if(g==null)r(m.el=i(m.children),k,I);else{const L=m.el=g.el;m.children!==g.children&&c(L,m.children)}},y=(g,m,k,I)=>{g==null?r(m.el=u(m.children||""),k,I):m.el=g.el},S=(g,m,k,I)=>{[g.el,g.anchor]=v(g.children,m,k,I,g.el,g.anchor)},b=({el:g,anchor:m},k,I)=>{let L;for(;g&&g!==m;)L=f(g),r(g,k,I),g=L;r(m,k,I)},C=({el:g,anchor:m})=>{let k;for(;g&&g!==m;)k=f(g),l(g),g=k;l(m)},D=(g,m,k,I,L,O,B,M,j)=>{m.type==="svg"?B="svg":m.type==="math"&&(B="mathml"),g==null?E(m,k,I,L,O,B,M,j):$(g,m,L,O,B,M,j)},E=(g,m,k,I,L,O,B,M)=>{let j,P;const{props:G,shapeFlag:J,transition:X,dirs:te}=g;if(j=g.el=s(g.type,O,G&&G.is,G),J&8?d(j,g.children):J&16&&N(g.children,j,null,I,L,zl(g,O),B,M),te&&_t(g,null,I,"created"),q(j,g,g.scopeId,B,I),G){for(const ve in G)ve!=="value"&&!Pn(ve)&&a(j,ve,null,G[ve],O,g.children,I,L,Oe);"value"in G&&a(j,"value",null,G.value,O),(P=G.onVnodeBeforeMount)&&at(P,I,g)}te&&_t(g,null,I,"beforeMount");const se=lc(L,X);se&&X.beforeEnter(j),r(j,m,k),((P=G&&G.onVnodeMounted)||se||te)&&We(()=>{P&&at(P,I,g),se&&X.enter(j),te&&_t(g,null,I,"mounted")},L)},q=(g,m,k,I,L)=>{if(k&&h(g,k),I)for(let O=0;O<I.length;O++)h(g,I[O]);if(L){let O=L.subTree;if(m===O){const B=L.vnode;q(g,B,B.scopeId,B.slotScopeIds,L.parent)}}},N=(g,m,k,I,L,O,B,M,j=0)=>{for(let P=j;P<g.length;P++){const G=g[P]=M?Ut(g[P]):mt(g[P]);w(null,G,m,k,I,L,O,B,M)}},$=(g,m,k,I,L,O,B)=>{const M=m.el=g.el;let{patchFlag:j,dynamicChildren:P,dirs:G}=m;j|=g.patchFlag&16;const J=g.props||Ee,X=m.props||Ee;let te;if(k&&an(k,!1),(te=X.onVnodeBeforeUpdate)&&at(te,k,m,g),G&&_t(m,g,k,"beforeUpdate"),k&&an(k,!0),P?V(g.dynamicChildren,P,M,k,I,zl(m,L),O):B||K(g,m,M,null,k,I,zl(m,L),O,!1),j>0){if(j&16)Y(M,m,J,X,k,I,L);else if(j&2&&J.class!==X.class&&a(M,"class",null,X.class,L),j&4&&a(M,"style",J.style,X.style,L),j&8){const se=m.dynamicProps;for(let ve=0;ve<se.length;ve++){const ke=se[ve],Ne=J[ke],ht=X[ke];(ht!==Ne||ke==="value")&&a(M,ke,Ne,ht,L,g.children,k,I,Oe)}}j&1&&g.children!==m.children&&d(M,m.children)}else!B&&P==null&&Y(M,m,J,X,k,I,L);((te=X.onVnodeUpdated)||G)&&We(()=>{te&&at(te,k,m,g),G&&_t(m,g,k,"updated")},I)},V=(g,m,k,I,L,O,B)=>{for(let M=0;M<m.length;M++){const j=g[M],P=m[M],G=j.el&&(j.type===et||!un(j,P)||j.shapeFlag&70)?p(j.el):k;w(j,P,G,null,I,L,O,B,!0)}},Y=(g,m,k,I,L,O,B)=>{if(k!==I){if(k!==Ee)for(const M in k)!Pn(M)&&!(M in I)&&a(g,M,k[M],null,B,m.children,L,O,Oe);for(const M in I){if(Pn(M))continue;const j=I[M],P=k[M];j!==P&&M!=="value"&&a(g,M,P,j,B,m.children,L,O,Oe)}"value"in I&&a(g,"value",k.value,I.value,B)}},H=(g,m,k,I,L,O,B,M,j)=>{const P=m.el=g?g.el:i(""),G=m.anchor=g?g.anchor:i("");let{patchFlag:J,dynamicChildren:X,slotScopeIds:te}=m;te&&(M=M?M.concat(te):te),g==null?(r(P,k,I),r(G,k,I),N(m.children||[],k,G,L,O,B,M,j)):J>0&&J&64&&X&&g.dynamicChildren?(V(g.dynamicChildren,X,k,L,O,B,M),(m.key!=null||L&&m===L.subTree)&&ac(g,m,!0)):K(g,m,k,G,L,O,B,M,j)},Q=(g,m,k,I,L,O,B,M,j)=>{m.slotScopeIds=M,g==null?m.shapeFlag&512?L.ctx.activate(m,k,I,B,j):Le(m,k,I,L,O,B,j):_e(g,m,j)},Le=(g,m,k,I,L,O,B)=>{const M=g.component=Pp(g,I,L);if(Sr(g)&&(M.ctx.renderer=Z),Mp(M),M.asyncDep){if(L&&L.registerDep(M,U),!g.el){const j=M.subTree=Ie(pt);y(null,j,m,k)}}else U(M,g,m,k,L,O,B)},_e=(g,m,k)=>{const I=m.component=g.component;if(j1(g,m,k))if(I.asyncDep&&!I.asyncResolved){ee(I,m,k);return}else I.next=m,P1(I.update),I.effect.dirty=!0,I.update();else m.el=g.el,I.vnode=m},U=(g,m,k,I,L,O,B)=>{const M=()=>{if(g.isMounted){let{next:G,bu:J,u:X,parent:te,vnode:se}=g;{const kn=sc(g);if(kn){G&&(G.el=se.el,ee(g,G,B)),kn.asyncDep.then(()=>{g.isUnmounted||M()});return}}let ve=G,ke;an(g,!1),G?(G.el=se.el,ee(g,G,B)):G=se,J&&Dl(J),(ke=G.props&&G.props.onVnodeBeforeUpdate)&&at(ke,te,G,se),an(g,!0);const Ne=Nl(g),ht=g.subTree;g.subTree=Ne,w(ht,Ne,p(ht.el),T(ht),g,L,O),G.el=Ne.el,ve===null&&V1(g,Ne.el),X&&We(X,L),(ke=G.props&&G.props.onVnodeUpdated)&&We(()=>at(ke,te,G,se),L)}else{let G;const{el:J,props:X}=m,{bm:te,m:se,parent:ve}=g,ke=ar(m);if(an(g,!1),te&&Dl(te),!ke&&(G=X&&X.onVnodeBeforeMount)&&at(G,ve,m),an(g,!0),J&&xe){const Ne=()=>{g.subTree=Nl(g),xe(J,g.subTree,g,L,null)};ke?m.type.__asyncLoader().then(()=>!g.isUnmounted&&Ne()):Ne()}else{const Ne=g.subTree=Nl(g);w(null,Ne,k,I,g,L,O),m.el=Ne.el}if(se&&We(se,L),!ke&&(G=X&&X.onVnodeMounted)){const Ne=m;We(()=>at(G,ve,Ne),L)}(m.shapeFlag&256||ve&&ar(ve.vnode)&&ve.vnode.shapeFlag&256)&&g.a&&We(g.a,L),g.isMounted=!0,m=k=I=null}},j=g.effect=new Ba(M,ot,()=>bl(P),g.scope),P=g.update=()=>{j.dirty&&j.run()};P.id=g.uid,an(g,!0),P()},ee=(g,m,k)=>{m.component=g;const I=g.vnode.props;g.vnode=m,g.next=null,pp(g,m.props,I,k),gp(g,m.children,k),mn(),Ws(g),vn()},K=(g,m,k,I,L,O,B,M,j=!1)=>{const P=g&&g.children,G=g?g.shapeFlag:0,J=m.children,{patchFlag:X,shapeFlag:te}=m;if(X>0){if(X&128){bt(P,J,k,I,L,O,B,M,j);return}else if(X&256){Re(P,J,k,I,L,O,B,M,j);return}}te&8?(G&16&&Oe(P,L,O),J!==P&&d(k,J)):G&16?te&16?bt(P,J,k,I,L,O,B,M,j):Oe(P,L,O,!0):(G&8&&d(k,""),te&16&&N(J,k,I,L,O,B,M,j))},Re=(g,m,k,I,L,O,B,M,j)=>{g=g||In,m=m||In;const P=g.length,G=m.length,J=Math.min(P,G);let X;for(X=0;X<J;X++){const te=m[X]=j?Ut(m[X]):mt(m[X]);w(g[X],te,k,null,L,O,B,M,j)}P>G?Oe(g,L,O,!0,!1,J):N(m,k,I,L,O,B,M,j,J)},bt=(g,m,k,I,L,O,B,M,j)=>{let P=0;const G=m.length;let J=g.length-1,X=G-1;for(;P<=J&&P<=X;){const te=g[P],se=m[P]=j?Ut(m[P]):mt(m[P]);if(un(te,se))w(te,se,k,null,L,O,B,M,j);else break;P++}for(;P<=J&&P<=X;){const te=g[J],se=m[X]=j?Ut(m[X]):mt(m[X]);if(un(te,se))w(te,se,k,null,L,O,B,M,j);else break;J--,X--}if(P>J){if(P<=X){const te=X+1,se=te<G?m[te].el:I;for(;P<=X;)w(null,m[P]=j?Ut(m[P]):mt(m[P]),k,se,L,O,B,M,j),P++}}else if(P>X)for(;P<=J;)De(g[P],L,O,!0),P++;else{const te=P,se=P,ve=new Map;for(P=se;P<=X;P++){const Je=m[P]=j?Ut(m[P]):mt(m[P]);Je.key!=null&&ve.set(Je.key,P)}let ke,Ne=0;const ht=X-se+1;let kn=!1,Os=0;const Xn=new Array(ht);for(P=0;P<ht;P++)Xn[P]=0;for(P=te;P<=J;P++){const Je=g[P];if(Ne>=ht){De(Je,L,O,!0);continue}let wt;if(Je.key!=null)wt=ve.get(Je.key);else for(ke=se;ke<=X;ke++)if(Xn[ke-se]===0&&un(Je,m[ke])){wt=ke;break}wt===void 0?De(Je,L,O,!0):(Xn[wt-se]=P+1,wt>=Os?Os=wt:kn=!0,w(Je,m[wt],k,null,L,O,B,M,j),Ne++)}const $s=kn?wp(Xn):In;for(ke=$s.length-1,P=ht-1;P>=0;P--){const Je=se+P,wt=m[Je],Ds=Je+1<G?m[Je+1].el:I;Xn[P]===0?w(null,wt,k,Ds,L,O,B,M,j):kn&&(ke<0||P!==$s[ke]?rt(wt,k,Ds,2):ke--)}}},rt=(g,m,k,I,L=null)=>{const{el:O,type:B,transition:M,children:j,shapeFlag:P}=g;if(P&6){rt(g.component.subTree,m,k,I);return}if(P&128){g.suspense.move(m,k,I);return}if(P&64){B.move(g,m,k,Z);return}if(B===et){r(O,m,k);for(let J=0;J<j.length;J++)rt(j[J],m,k,I);r(g.anchor,m,k);return}if(B===ir){b(g,m,k);return}if(I!==2&&P&1&&M)if(I===0)M.beforeEnter(O),r(O,m,k),We(()=>M.enter(O),L);else{const{leave:J,delayLeave:X,afterLeave:te}=M,se=()=>r(O,m,k),ve=()=>{J(O,()=>{se(),te&&te()})};X?X(O,se,ve):ve()}else r(O,m,k)},De=(g,m,k,I=!1,L=!1)=>{const{type:O,props:B,ref:M,children:j,dynamicChildren:P,shapeFlag:G,patchFlag:J,dirs:X}=g;if(M!=null&&cl(M,null,k,g,!0),G&256){m.ctx.deactivate(g);return}const te=G&1&&X,se=!ar(g);let ve;if(se&&(ve=B&&B.onVnodeBeforeUnmount)&&at(ve,m,g),G&6)xt(g.component,k,I);else{if(G&128){g.suspense.unmount(k,I);return}te&&_t(g,null,m,"beforeUnmount"),G&64?g.type.remove(g,m,k,L,Z,I):P&&(O!==et||J>0&&J&64)?Oe(P,m,k,!1,!0):(O===et&&J&384||!L&&G&16)&&Oe(j,m,k),I&&Xe(g)}(se&&(ve=B&&B.onVnodeUnmounted)||te)&&We(()=>{ve&&at(ve,m,g),te&&_t(g,null,m,"unmounted")},k)},Xe=g=>{const{type:m,el:k,anchor:I,transition:L}=g;if(m===et){St(k,I);return}if(m===ir){C(g);return}const O=()=>{l(k),L&&!L.persisted&&L.afterLeave&&L.afterLeave()};if(g.shapeFlag&1&&L&&!L.persisted){const{leave:B,delayLeave:M}=L,j=()=>B(k,O);M?M(g.el,O,j):j()}else O()},St=(g,m)=>{let k;for(;g!==m;)k=f(g),l(g),g=k;l(m)},xt=(g,m,k)=>{const{bum:I,scope:L,update:O,subTree:B,um:M}=g;I&&Dl(I),L.stop(),O&&(O.active=!1,De(B,g,m,k)),M&&We(M,m),We(()=>{g.isUnmounted=!0},m),m&&m.pendingBranch&&!m.isUnmounted&&g.asyncDep&&!g.asyncResolved&&g.suspenseId===m.pendingId&&(m.deps--,m.deps===0&&m.resolve())},Oe=(g,m,k,I=!1,L=!1,O=0)=>{for(let B=O;B<g.length;B++)De(g[B],m,k,I,L)},T=g=>g.shapeFlag&6?T(g.component.subTree):g.shapeFlag&128?g.suspense.next():f(g.anchor||g.el);let F=!1;const z=(g,m,k)=>{g==null?m._vnode&&De(m._vnode,null,null,!0):w(m._vnode||null,g,m,null,null,null,k),F||(F=!0,Ws(),sl(),F=!1),m._vnode=g},Z={p:w,um:De,m:rt,r:Xe,mt:Le,mc:N,pc:K,pbc:V,n:T,o:e};let ce,xe;return t&&([ce,xe]=t(Z)),{render:z,hydrate:ce,createApp:up(z,ce)}}function zl({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function an({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function lc(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ac(e,t,n=!1){const r=e.children,l=t.children;if(ne(r)&&ne(l))for(let a=0;a<r.length;a++){const s=r[a];let i=l[a];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=l[a]=Ut(l[a]),i.el=s.el),n||ac(s,i)),i.type===Vn&&(i.el=s.el)}}function wp(e){const t=e.slice(),n=[0];let r,l,a,s,i;const u=e.length;for(r=0;r<u;r++){const c=e[r];if(c!==0){if(l=n[n.length-1],e[l]<c){t[r]=l,n.push(r);continue}for(a=0,s=n.length-1;a<s;)i=a+s>>1,e[n[i]]<c?a=i+1:s=i;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,s=n[a-1];a-- >0;)n[a]=s,s=t[s];return n}function sc(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:sc(t)}const _p=e=>e.__isTeleport,et=Symbol.for("v-fgt"),Vn=Symbol.for("v-txt"),pt=Symbol.for("v-cmt"),ir=Symbol.for("v-stc"),cr=[];let vt=null;function kp(e=!1){cr.push(vt=e?null:[])}function Ep(){cr.pop(),vt=cr[cr.length-1]||null}let yr=1;function ro(e){yr+=e}function oc(e){return e.dynamicChildren=yr>0?vt||In:null,Ep(),yr>0&&vt&&vt.push(e),e}function _6(e,t,n,r,l,a){return oc(cc(e,t,n,r,l,a,!0))}function Cp(e,t,n,r,l){return oc(Ie(e,t,n,r,l,!0))}function va(e){return e?e.__v_isVNode===!0:!1}function un(e,t){return e.type===t.type&&e.key===t.key}const _l="__vInternal",ic=({key:e})=>e??null,nl=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ve(e)||He(e)||re(e)?{i:it,r:e,k:t,f:!!n}:e:null);function cc(e,t=null,n=null,r=0,l=null,a=e===et?0:1,s=!1,i=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ic(t),ref:t&&nl(t),scopeId:Vi,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:l,dynamicChildren:null,appContext:null,ctx:it};return i?(ts(u,n),a&128&&e.normalize(u)):n&&(u.shapeFlag|=Ve(n)?8:16),yr>0&&!s&&vt&&(u.patchFlag>0||a&6)&&u.patchFlag!==32&&vt.push(u),u}const Ie=Tp;function Tp(e,t=null,n=null,r=0,l=null,a=!1){if((!e||e===H1)&&(e=pt),va(e)){const i=Jt(e,t,!0);return n&&ts(i,n),yr>0&&!a&&vt&&(i.shapeFlag&6?vt[vt.indexOf(e)]=i:vt.push(i)),i.patchFlag|=-2,i}if(Np(e)&&(e=e.__vccOpts),t){t=Lp(t);let{class:i,style:u}=t;i&&!Ve(i)&&(t.class=za(i)),Ae(u)&&(Ai(u)&&!ne(u)&&(u=$e({},u)),t.style=Ha(u))}const s=Ve(e)?1:B1(e)?128:_p(e)?64:Ae(e)?4:re(e)?2:0;return cc(e,t,n,r,l,s,a,!0)}function Lp(e){return e?Ai(e)||_l in e?$e({},e):e:null}function Jt(e,t,n=!1){const{props:r,ref:l,patchFlag:a,children:s}=e,i=t?Sp(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:i,key:i&&ic(i),ref:t&&t.ref?n&&l?ne(l)?l.concat(nl(t)):[l,nl(t)]:nl(t):l,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==et?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Jt(e.ssContent),ssFallback:e.ssFallback&&Jt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function uc(e=" ",t=0){return Ie(Vn,null,e,t)}function k6(e,t){const n=Ie(ir,null,e);return n.staticCount=t,n}function E6(e="",t=!1){return t?(kp(),Cp(pt,null,e)):Ie(pt,null,e)}function mt(e){return e==null||typeof e=="boolean"?Ie(pt):ne(e)?Ie(et,null,e.slice()):typeof e=="object"?Ut(e):Ie(Vn,null,String(e))}function Ut(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Jt(e)}function ts(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(ne(t))n=16;else if(typeof t=="object")if(r&65){const l=t.default;l&&(l._c&&(l._d=!1),ts(e,l()),l._c&&(l._d=!0));return}else{n=32;const l=t._;!l&&!(_l in t)?t._ctx=it:l===3&&it&&(it.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else re(t)?(t={default:t,_ctx:it},n=32):(t=String(t),r&64?(n=16,t=[uc(t)]):n=8);e.children=t,e.shapeFlag|=n}function Sp(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const l in r)if(l==="class")t.class!==r.class&&(t.class=za([t.class,r.class]));else if(l==="style")t.style=Ha([t.style,r.style]);else if(Cr(l)){const a=t[l],s=r[l];s&&a!==s&&!(ne(a)&&a.includes(s))&&(t[l]=a?[].concat(a,s):s)}else l!==""&&(t[l]=r[l])}return t}function at(e,t,n,r=null){ct(e,t,7,[n,r])}const Ap=Ji();let Ip=0;function Pp(e,t,n){const r=e.type,l=(t?t.appContext:e.appContext)||Ap,a={uid:Ip++,vnode:e,type:r,parent:t,appContext:l,root:null,next:null,subTree:null,effect:null,update:null,scope:new Qd(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(l.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ec(r,l),emitsOptions:ji(r,l),emit:null,emitted:null,propsDefaults:Ee,inheritAttrs:r.inheritAttrs,ctx:Ee,data:Ee,props:Ee,attrs:Ee,slots:Ee,refs:Ee,setupState:Ee,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=O1.bind(null,a),e.ce&&e.ce(a),a}let je=null;const bn=()=>je||it;let ul,ya;{const e=hi(),t=(n,r)=>{let l;return(l=e[n])||(l=e[n]=[]),l.push(r),a=>{l.length>1?l.forEach(s=>s(a)):l[0](a)}};ul=t("__VUE_INSTANCE_SETTERS__",n=>je=n),ya=t("__VUE_SSR_SETTERS__",n=>Ir=n)}const Ar=e=>{const t=je;return ul(e),e.scope.on(),()=>{e.scope.off(),ul(t)}},lo=()=>{je&&je.scope.off(),ul(null)};function dc(e){return e.vnode.shapeFlag&4}let Ir=!1;function Mp(e,t=!1){t&&ya(t);const{props:n,children:r}=e.vnode,l=dc(e);dp(e,n,l,t),hp(e,r);const a=l?Rp(e,t):void 0;return t&&ya(!1),a}function Rp(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Ii(new Proxy(e.ctx,rp));const{setup:r}=n;if(r){const l=e.setupContext=r.length>1?$p(e):null,a=Ar(e);mn();const s=Yt(r,e,0,[e.props,l]);if(vn(),a(),fi(s)){if(s.then(lo,lo),t)return s.then(i=>{ao(e,i,t)}).catch(i=>{Lr(i,e,0)});e.asyncDep=s}else ao(e,s,t)}else pc(e,t)}function ao(e,t,n){re(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Ae(t)&&(e.setupState=Ri(t)),pc(e,n)}let so;function pc(e,t,n){const r=e.type;if(!e.render){if(!t&&so&&!r.render){const l=r.template||Qa(e).template;if(l){const{isCustomElement:a,compilerOptions:s}=e.appContext.config,{delimiters:i,compilerOptions:u}=r,c=$e($e({isCustomElement:a,delimiters:i},s),u);r.render=so(l,c)}}e.render=r.render||ot}{const l=Ar(e);mn();try{lp(e)}finally{vn(),l()}}}function Op(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return Ye(e,"get","$attrs"),t[n]}}))}function $p(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return Op(e)},slots:e.slots,emit:e.emit,expose:t}}function ns(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Ri(Ii(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in sr)return sr[n](e)},has(t,n){return n in t||n in sr}}))}function Dp(e,t=!0){return re(e)?e.displayName||e.name:e.name||t&&e.__name}function Np(e){return re(e)&&"__vccOpts"in e}const x=(e,t)=>_1(e,t,Ir);function o(e,t,n){const r=arguments.length;return r===2?Ae(t)&&!ne(t)?va(t)?Ie(e,null,[t]):Ie(e,t):Ie(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&va(n)&&(n=[n]),Ie(e,t,n))}const jp="3.4.18";/**
* @vue/runtime-dom v3.4.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Vp="http://www.w3.org/2000/svg",Hp="http://www.w3.org/1998/Math/MathML",qt=typeof document<"u"?document:null,oo=qt&&qt.createElement("template"),zp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const l=t==="svg"?qt.createElementNS(Vp,e):t==="mathml"?qt.createElementNS(Hp,e):qt.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&l.setAttribute("multiple",r.multiple),l},createText:e=>qt.createTextNode(e),createComment:e=>qt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>qt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,l,a){const s=n?n.previousSibling:t.lastChild;if(l&&(l===a||l.nextSibling))for(;t.insertBefore(l.cloneNode(!0),n),!(l===a||!(l=l.nextSibling)););else{oo.innerHTML=r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e;const i=oo.content;if(r==="svg"||r==="mathml"){const u=i.firstChild;for(;u.firstChild;)i.appendChild(u.firstChild);i.removeChild(u)}t.insertBefore(i,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ht="transition",Jn="animation",Hn=Symbol("_vtc"),Qt=(e,{slots:t})=>o(q1,hc(e),t);Qt.displayName="Transition";const fc={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Bp=Qt.props=$e({},Wi,fc),sn=(e,t=[])=>{ne(e)?e.forEach(n=>n(...t)):e&&e(...t)},io=e=>e?ne(e)?e.some(t=>t.length>1):e.length>1:!1;function hc(e){const t={};for(const H in e)H in fc||(t[H]=e[H]);if(e.css===!1)return t;const{name:n="v",type:r,duration:l,enterFromClass:a=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:i=`${n}-enter-to`,appearFromClass:u=a,appearActiveClass:c=s,appearToClass:d=i,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:h=`${n}-leave-to`}=e,v=Fp(l),w=v&&v[0],_=v&&v[1],{onBeforeEnter:y,onEnter:S,onEnterCancelled:b,onLeave:C,onLeaveCancelled:D,onBeforeAppear:E=y,onAppear:q=S,onAppearCancelled:N=b}=t,$=(H,Q,Le)=>{Ft(H,Q?d:i),Ft(H,Q?c:s),Le&&Le()},V=(H,Q)=>{H._isLeaving=!1,Ft(H,p),Ft(H,h),Ft(H,f),Q&&Q()},Y=H=>(Q,Le)=>{const _e=H?q:S,U=()=>$(Q,H,Le);sn(_e,[Q,U]),co(()=>{Ft(Q,H?u:a),It(Q,H?d:i),io(_e)||uo(Q,r,w,U)})};return $e(t,{onBeforeEnter(H){sn(y,[H]),It(H,a),It(H,s)},onBeforeAppear(H){sn(E,[H]),It(H,u),It(H,c)},onEnter:Y(!1),onAppear:Y(!0),onLeave(H,Q){H._isLeaving=!0;const Le=()=>V(H,Q);It(H,p),mc(),It(H,f),co(()=>{H._isLeaving&&(Ft(H,p),It(H,h),io(C)||uo(H,r,_,Le))}),sn(C,[H,Le])},onEnterCancelled(H){$(H,!1),sn(b,[H])},onAppearCancelled(H){$(H,!0),sn(N,[H])},onLeaveCancelled(H){V(H),sn(D,[H])}})}function Fp(e){if(e==null)return null;if(Ae(e))return[Bl(e.enter),Bl(e.leave)];{const t=Bl(e);return[t,t]}}function Bl(e){return Ud(e)}function It(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Hn]||(e[Hn]=new Set)).add(t)}function Ft(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const n=e[Hn];n&&(n.delete(t),n.size||(e[Hn]=void 0))}function co(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Gp=0;function uo(e,t,n,r){const l=e._endId=++Gp,a=()=>{l===e._endId&&r()};if(n)return setTimeout(a,n);const{type:s,timeout:i,propCount:u}=gc(e,t);if(!s)return r();const c=s+"end";let d=0;const p=()=>{e.removeEventListener(c,f),a()},f=h=>{h.target===e&&++d>=u&&p()};setTimeout(()=>{d<u&&p()},i+1),e.addEventListener(c,f)}function gc(e,t){const n=window.getComputedStyle(e),r=v=>(n[v]||"").split(", "),l=r(`${Ht}Delay`),a=r(`${Ht}Duration`),s=po(l,a),i=r(`${Jn}Delay`),u=r(`${Jn}Duration`),c=po(i,u);let d=null,p=0,f=0;t===Ht?s>0&&(d=Ht,p=s,f=a.length):t===Jn?c>0&&(d=Jn,p=c,f=u.length):(p=Math.max(s,c),d=p>0?s>c?Ht:Jn:null,f=d?d===Ht?a.length:u.length:0);const h=d===Ht&&/\b(transform|all)(,|$)/.test(r(`${Ht}Property`).toString());return{type:d,timeout:p,propCount:f,hasTransform:h}}function po(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>fo(n)+fo(e[r])))}function fo(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function mc(){return document.body.offsetHeight}function Wp(e,t,n){const r=e[Hn];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const ho=Symbol("_vod"),Up=Symbol(""),qp=/(^|;)\s*display\s*:/;function Kp(e,t,n){const r=e.style,l=Ve(n),a=r.display;let s=!1;if(n&&!l){if(t&&!Ve(t))for(const i in t)n[i]==null&&ba(r,i,"");for(const i in n)i==="display"&&(s=!0),ba(r,i,n[i])}else if(l){if(t!==n){const i=r[Up];i&&(n+=";"+i),r.cssText=n,s=qp.test(n)}}else t&&e.removeAttribute("style");ho in e&&(e[ho]=s?r.display:"",r.display=a)}const go=/\s*!important$/;function ba(e,t,n){if(ne(n))n.forEach(r=>ba(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Zp(e,t);go.test(n)?e.setProperty(Gn(r),n.replace(go,""),"important"):e[r]=n}}const mo=["Webkit","Moz","ms"],Fl={};function Zp(e,t){const n=Fl[t];if(n)return n;let r=Ze(t);if(r!=="filter"&&r in e)return Fl[t]=r;r=Wn(r);for(let l=0;l<mo.length;l++){const a=mo[l]+r;if(a in e)return Fl[t]=a}return t}const vo="http://www.w3.org/1999/xlink";function Yp(e,t,n,r,l){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(vo,t.slice(6,t.length)):e.setAttributeNS(vo,t,n);else{const a=Jd(t);n==null||a&&!gi(n)?e.removeAttribute(t):e.setAttribute(t,a?"":n)}}function Xp(e,t,n,r,l,a,s){if(t==="innerHTML"||t==="textContent"){r&&s(r,l,a),e[t]=n??"";return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){e._value=n;const c=i==="OPTION"?e.getAttribute("value"):e.value,d=n??"";c!==d&&(e.value=d),n==null&&e.removeAttribute(t);return}let u=!1;if(n===""||n==null){const c=typeof e[t];c==="boolean"?n=gi(n):n==null&&c==="string"?(n="",u=!0):c==="number"&&(n=0,u=!0)}try{e[t]=n}catch{}u&&e.removeAttribute(t)}function Jp(e,t,n,r){e.addEventListener(t,n,r)}function Qp(e,t,n,r){e.removeEventListener(t,n,r)}const yo=Symbol("_vei");function e2(e,t,n,r,l=null){const a=e[yo]||(e[yo]={}),s=a[t];if(r&&s)s.value=r;else{const[i,u]=t2(t);if(r){const c=a[t]=l2(r,l);Jp(e,i,c,u)}else s&&(Qp(e,i,s,u),a[t]=void 0)}}const bo=/(?:Once|Passive|Capture)$/;function t2(e){let t;if(bo.test(e)){t={};let r;for(;r=e.match(bo);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Gn(e.slice(2)),t]}let Gl=0;const n2=Promise.resolve(),r2=()=>Gl||(n2.then(()=>Gl=0),Gl=Date.now());function l2(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ct(a2(r,n.value),t,5,[r])};return n.value=e,n.attached=r2(),n}function a2(e,t){if(ne(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>l=>!l._stopped&&r&&r(l))}else return t}const xo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,s2=(e,t,n,r,l,a,s,i,u)=>{const c=l==="svg";t==="class"?Wp(e,r,c):t==="style"?Kp(e,n,r):Cr(t)?Na(t)||e2(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):o2(e,t,r,c))?Xp(e,t,r,a,s,i,u):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Yp(e,t,r,c))};function o2(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&xo(t)&&re(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const l=e.tagName;if(l==="IMG"||l==="VIDEO"||l==="CANVAS"||l==="SOURCE")return!1}return xo(t)&&Ve(n)?!1:t in e}const vc=new WeakMap,yc=new WeakMap,dl=Symbol("_moveCb"),wo=Symbol("_enterCb"),bc={name:"TransitionGroup",props:$e({},Bp,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=bn(),r=Gi();let l,a;return Zi(()=>{if(!l.length)return;const s=e.moveClass||`${e.name||"v"}-move`;if(!f2(l[0].el,n.vnode.el,s))return;l.forEach(u2),l.forEach(d2);const i=l.filter(p2);mc(),i.forEach(u=>{const c=u.el,d=c.style;It(c,s),d.transform=d.webkitTransform=d.transitionDuration="";const p=c[dl]=f=>{f&&f.target!==c||(!f||/transform$/.test(f.propertyName))&&(c.removeEventListener("transitionend",p),c[dl]=null,Ft(c,s))};c.addEventListener("transitionend",p)})}),()=>{const s=ie(e),i=hc(s);let u=s.tag||et;l=a,a=t.default?Ja(t.default()):[];for(let c=0;c<a.length;c++){const d=a[c];d.key!=null&&vr(d,mr(d,i,r,n))}if(l)for(let c=0;c<l.length;c++){const d=l[c];vr(d,mr(d,i,r,n)),vc.set(d,d.el.getBoundingClientRect())}return Ie(u,null,a)}}},i2=e=>delete e.mode;bc.props;const c2=bc;function u2(e){const t=e.el;t[dl]&&t[dl](),t[wo]&&t[wo]()}function d2(e){yc.set(e,e.el.getBoundingClientRect())}function p2(e){const t=vc.get(e),n=yc.get(e),r=t.left-n.left,l=t.top-n.top;if(r||l){const a=e.el.style;return a.transform=a.webkitTransform=`translate(${r}px,${l}px)`,a.transitionDuration="0s",e}}function f2(e,t,n){const r=e.cloneNode(),l=e[Hn];l&&l.forEach(i=>{i.split(/\s+/).forEach(u=>u&&r.classList.remove(u))}),n.split(/\s+/).forEach(i=>i&&r.classList.add(i)),r.style.display="none";const a=t.nodeType===1?t:t.parentNode;a.appendChild(r);const{hasTransform:s}=gc(r);return a.removeChild(r),s}const h2=$e({patchProp:s2},zp);let Wl,_o=!1;function g2(){return Wl=_o?Wl:bp(h2),_o=!0,Wl}const m2=(...e)=>{const t=g2().createApp(...e),{mount:n}=t;return t.mount=r=>{const l=y2(r);if(l)return n(l,!0,v2(l))},t};function v2(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function y2(e){return Ve(e)?document.querySelector(e):e}var b2=["link","meta","script","style","noscript","template"],x2=["title","base"],w2=([e,t,n])=>x2.includes(e)?e:b2.includes(e)?e==="meta"&&t.name?`${e}.${t.name}`:e==="template"&&t.id?`${e}.${t.id}`:JSON.stringify([e,Object.entries(t).map(([r,l])=>typeof l=="boolean"?l?[r,""]:null:[r,l]).filter(r=>r!=null).sort(([r],[l])=>r.localeCompare(l)),n]):null,_2=e=>{const t=new Set,n=[];return e.forEach(r=>{const l=w2(r);l&&!t.has(l)&&(t.add(l),n.push(r))}),n},k2=e=>e[0]==="/"?e:`/${e}`,xc=e=>e[e.length-1]==="/"||e.endsWith(".html")?e:`${e}/`,tn=e=>/^(https?:)?\/\//.test(e),E2=/.md((\?|#).*)?$/,br=(e,t="/")=>!!(tn(e)||e.startsWith("/")&&!e.startsWith(t)&&!E2.test(e)),wc=e=>/^[a-z][a-z0-9+.-]*:/.test(e),qn=e=>Object.prototype.toString.call(e)==="[object Object]",C2=e=>{const[t,...n]=e.split(/(\?|#)/);if(!t||t.endsWith("/"))return e;let r=t.replace(/(^|\/)README.md$/i,"$1index.html");return r.endsWith(".md")?r=r.substring(0,r.length-3)+".html":r.endsWith(".html")||(r=r+".html"),r.endsWith("/index.html")&&(r=r.substring(0,r.length-10)),r+n.join("")},rs=e=>e[e.length-1]==="/"?e.slice(0,-1):e,_c=e=>e[0]==="/"?e.slice(1):e,T2=(e,t)=>{const n=Object.keys(e).sort((r,l)=>{const a=l.split("/").length-r.split("/").length;return a!==0?a:l.length-r.length});for(const r of n)if(t.startsWith(r))return r;return"/"},L2=e=>typeof e=="function",Me=e=>typeof e=="string";const S2="modulepreload",A2=function(e){return"/"+e},ko={},A=function(t,n,r){let l=Promise.resolve();if(n&&n.length>0){const a=document.getElementsByTagName("link");l=Promise.all(n.map(s=>{if(s=A2(s),s in ko)return;ko[s]=!0;const i=s.endsWith(".css"),u=i?'[rel="stylesheet"]':"";if(!!r)for(let p=a.length-1;p>=0;p--){const f=a[p];if(f.href===s&&(!i||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${u}`))return;const d=document.createElement("link");if(d.rel=i?"stylesheet":S2,i||(d.as="script",d.crossOrigin=""),d.href=s,document.head.appendChild(d),i)return new Promise((p,f)=>{d.addEventListener("load",p),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${s}`)))})}))}return l.then(()=>t()).catch(a=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a})},I2=JSON.parse("{}"),P2=Object.fromEntries([["/",{loader:()=>A(()=>import("./index.html-C6q077vE.js"),__vite__mapDeps([0,1])),meta:{y:"h",t:""}}],["/intro.html",{loader:()=>A(()=>import("./intro.html-vVbXJlit.js"),__vite__mapDeps([2,1])),meta:{d:1707929375e3,v:"/assets/images/Fearless!.png",e:`
<p>🎉 欢迎来到 Dream_oyh 的 blog！</p>
<h2>For you</h2>
`,r:{minutes:4.6,words:1380},y:"a",t:"个人简介",i:"profilefill"}}],["/article/CPC.html",{loader:()=>A(()=>import("./CPC.html-CVxyQSNG.js"),__vite__mapDeps([3,1])),meta:{d:1707929375e3,e:`
<h2>入党誓词</h2>
<p>我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。</p>
<h2>党的二十大精神学习</h2>
<ul>
<li><strong>大会主题：</strong> 高举中国特色社会主义伟大旗帜，全面贯彻新时代中国特色社会主义思想，弘扬伟大建党精神，自信自强，守正创新，踔厉奋发，勇毅前行，为全面建设社会主义现代化国家、全面推进中华民族伟大复兴而团结奋斗</li>
</ul>
<hr>
<ul>
<li><strong>十年来的三件大事：</strong></li>
</ul>`,r:{minutes:7.29,words:2187},y:"a",t:"党的理论学习"}}],["/article/CSU.html",{loader:()=>A(()=>import("./CSU.html-rVqXeG1r.js"),__vite__mapDeps([4,1])),meta:{d:17091648e5,l:"2024年2月29日",e:`
<div class="hint-container tip">
<p class="hint-container-title">写在前面</p>
<p>我于 2021 年进入 CSU 就读，几年间也摸索到了很多大学中的技巧以及 CSU 目前存在的问题，本博客不保证内容的准确性，只是个人观点，仅供参考。</p>
<p>本人就读于中南大学交通院交通设备专业，以下涉及专业课程推荐的内容，仅仅极限于本专业，并不能作为其他专业同学的选课参考</p>
</div>
<h2>专业选修课横评</h2>
<ul>
<li>计算机工程图学 - 许平</li>
</ul>
<p>这门课主要是学习计算机如何画出直线、圆以及其他曲线，学习计算机绘制和操作几何图形的底层算法，包括直线、多边形、圆、填充、裁切等，我们这一届考试不难，基本都是老师 PPT 上的内容，要有一点 C++ 基础，会定义变量、赋值变量、定义函数、调用函数就可以。期末复习时，我也整理了几页的备考资料，在我这一届，这几页资料确实压到了几乎每道题，链接如下：</p>`,r:{minutes:5.54,words:1662},y:"a",t:"CSU 记录"}}],["/article/article.html",{loader:()=>A(()=>import("./article.html-DEIjPYr-.js"),__vite__mapDeps([5,1])),meta:{d:1708009614e3,e:`
<p>心生而言立，言立而文明，自然之道也。——《文心雕龙·原道》</p>
<h2>19 岁的感慨</h2>
<p>小欧同学：</p>
<p>  Hi！</p>
<p>  不得不说你很幸运，毕竟生日在 7 月，往年的这个时候，包括此刻，都是一个旧阶段的结束，一个崭新阶段的开始。阶梯般更迭，飞蝶般成长。不过别太得意了，7 月 12 日，明天，不过是万千日子中再平凡不过的一天而已，你的生日，不算什么。无非太阳自你出生那一刻起，走过了 19 个春夏秋冬，月亮出演了 228 次阴晴圆缺。明天一早，你还得背上书包，前往工训基地，一切都如往常。</p>
<p>  一年以来，你的 18 岁已悄然结束，精彩吗？一时不知如何回答。可能丰富的经历，多彩的大学生活，的确足够让你在父辈、小学以及初高中老师面前吹嘘一个上午，但，相较于那些大神，你的 18 岁，一点也算不上精彩。但，你是幸运的。</p>`,r:{minutes:16.16,words:4848},y:"a",t:"文章"}}],["/article/baoyan.html",{loader:()=>A(()=>import("./baoyan.html-CBUJAi4S.js"),__vite__mapDeps([6,1])),meta:{d:17091648e5,l:"2024年2月29日",n:!0,r:{minutes:3.82,words:1147},y:"a",t:"保研资源站"}}],["/article/external.html",{loader:()=>A(()=>import("./external.html-CehWd9p4.js"),__vite__mapDeps([7,1])),meta:{d:1708053243e3,e:`
<h2>计算机</h2>
<ul>
<li><a href="https://missing-semester-cn.github.io/" target="_blank" rel="noopener noreferrer">计算机教育中缺失的一环</a></li>
</ul>
<h2>算法</h2>
<ul>
<li><a href="http://colah.github.io/" target="_blank" rel="noopener noreferrer">colah's blog 记录了很多深度学习的算法原理，通俗易懂</a></li>
</ul>
<h2>人文关怀</h2>
`,r:{minutes:.39,words:116},y:"a",t:"他山之石"}}],["/article/film_recommend.html",{loader:()=>A(()=>import("./film_recommend.html-mFK4q8mq.js"),__vite__mapDeps([8,1])),meta:{d:1707929375e3,e:`
<p><strong>在熙攘而变得逼仄的世界</strong></p>
<p><strong>与富足而封闭的“宅”之间</strong></p>
<p><strong>在影院“洞穴”</strong></p>
<p><strong>与黑镜的闪烁之间</strong></p>
<p><strong>电影与文学仍是我们</strong></p>
<p><strong>望向世界的窗口</strong></p>
<p><strong>是我们破镜而出的可能</strong></p>
<div style="text-align: right; ">——戴锦华老师</div>
<h2>《隐入尘烟》</h2>`,r:{minutes:3.84,words:1153},y:"a",t:"电影推荐+记录"}}],["/article/hamlet.html",{loader:()=>A(()=>import("./hamlet.html-ByvfeqaA.js"),__vite__mapDeps([9,1])),meta:{d:1707929375e3,e:`
<p>英语原著的阅读不会过分拘泥于英语单词的积累，而是着眼于句子的表达，文章内容的表达</p>
<p>[英]威廉·莎士比亚 作   朱生豪 译</p>
<p>【地道表达】Stand and unfold yourself.</p>
<p>站住，告诉我你是什么人。</p>
<p>Long live the king!</p>
<p>国王万岁！</p>
<p>The rivals of my watch, bid them make haste.</p>
<p>我的守夜伙伴们，叫他们赶紧来(make haste ---赶紧，抓紧)</p>
<p>farewell, honest soldier！</p>`,r:{minutes:1.98,words:593},y:"a",t:"哈姆雷特英语阅读"}}],["/article/",{loader:()=>A(()=>import("./index.html-tyPnywCR.js"),__vite__mapDeps([10,1])),meta:{d:1708053243e3,e:`
<p>该板块会记录我写的个人随笔、杂项文章、在 CSU 的学习生活和他山之石，目录可见侧边栏。</p>
`,r:{minutes:.13,words:38},y:"a",t:"文章"}}],["/article/read.html",{loader:()=>A(()=>import("./read.html-DEf7GlRg.js"),__vite__mapDeps([11,1])),meta:{d:1707929375e3,e:`
<text style="font-family:宋体;">
<p><strong>唯有文字能够担当此任，宣告生命曾经在场。——《三明一中校刊》</strong></p>
<h2>目前已读的书（大学期间）</h2>
<table>
<thead>
<tr>
<th style="text-align:center">书目</th>
<th style="text-align:center">作者</th>
<th style="text-align:left">简评</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">局外人</td>
<td style="text-align:center">[法] 阿尔贝·加缪</td>
<td style="text-align:left">他用冷漠对抗虚无与抽象，用热爱拥抱具体与真实</td>
</tr>
<tr>
<td style="text-align:center">鼠疫</td>
<td style="text-align:center">[法] 阿尔贝·加缪</td>
<td style="text-align:left">在荒诞中奋起反抗，在绝望中坚持真理和正义</td>
</tr>
<tr>
<td style="text-align:center">文化苦旅</td>
<td style="text-align:center">余秋雨</td>
<td style="text-align:left">万里蹀躞，以此为归</td>
</tr>
<tr>
<td style="text-align:center">千年一叹</td>
<td style="text-align:center">余秋雨</td>
<td style="text-align:left">触摸世界脉搏，感知中华文化</td>
</tr>
<tr>
<td style="text-align:center">小时候真傻，居然盼着长大</td>
<td style="text-align:center">老舍</td>
<td style="text-align:left">京味，浪漫，讽刺集于一书</td>
</tr>
<tr>
<td style="text-align:center">百年孤独</td>
<td style="text-align:center">[哥伦比亚] 马尔克斯</td>
<td style="text-align:left">家族的第一个人被绑在树上，最后一个人被蚂蚁咬死</td>
</tr>
<tr>
<td style="text-align:center">乌合之众</td>
<td style="text-align:center">[法] 古斯塔斯·勒庞</td>
<td style="text-align:left">群众总是愚蠢的，谦谦君子混入群体中也将变成十恶不赦的暴徒</td>
</tr>
<tr>
<td style="text-align:center">中国在梁庄</td>
<td style="text-align:center">梁鸿</td>
<td style="text-align:left">每一个村庄都是一部历史，每个家庭都是一个独特的人生类型</td>
</tr>
<tr>
<td style="text-align:center">出梁庄记</td>
<td style="text-align:center">梁鸿</td>
<td style="text-align:left">我终将离梁庄而去</td>
</tr>
<tr>
<td style="text-align:center">梁庄十年</td>
<td style="text-align:center">梁鸿</td>
<td style="text-align:left">我从来没意识到梁庄如此之美，尽管它的内部千疮百孔。</td>
</tr>
<tr>
<td style="text-align:center">碧奴</td>
<td style="text-align:center">苏童</td>
<td style="text-align:left">以“哭”贯穿全文，一首在轰隆隆山石破碎声中结束的思夫挽歌</td>
</tr>
<tr>
<td style="text-align:center">哈姆雷特</td>
<td style="text-align:center">[英] 莎士比亚</td>
<td style="text-align:left">多重人格的折叠，由犹豫带来的英国宫廷悲剧</td>
</tr>
<tr>
<td style="text-align:center">威尼斯商人</td>
<td style="text-align:center">[英] 莎士比亚</td>
<td style="text-align:left">人之向善，邪恶与冷酷终将得到惩罚</td>
</tr>
</tbody>
</table>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>（由于未记录阅读时间，在此不做展示）</p>
</div>
<h2>未读书单</h2>
<table>
<thead>
<tr>
<th style="text-align:center">书目</th>
<th style="text-align:center">作者</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">西西弗神话</td>
<td style="text-align:center">[法] 阿尔贝·加缪</td>
</tr>
<tr>
<td style="text-align:center">瓦尔登湖<del>（中英双译）</del></td>
<td style="text-align:center">[美] 梭罗</td>
</tr>
<tr>
<td style="text-align:center">刀锋</td>
<td style="text-align:center">[英] 毛姆</td>
</tr>
<tr>
<td style="text-align:center">陶庵梦忆</td>
<td style="text-align:center">张岱（在读）</td>
</tr>
<tr>
<td style="text-align:center">战争与和平</td>
<td style="text-align:center">列夫托尔斯泰（在读）</td>
</tr>
<tr>
<td style="text-align:center">兄弟</td>
<td style="text-align:center">余华</td>
</tr>
<tr>
<td style="text-align:center">遥远的救世主</td>
<td style="text-align:center">豆豆</td>
</tr>
</tbody>
</table>
<h2>读书笔记</h2>
<h3>《出梁庄记》</h3>
<ul>
<li>
<p>这是深秋的傍晚，微冷微寒。一辆辆公交车停下，走出一批批的人，或过马路进到河南村的南门里，或沿着公路往两边的村庄走，个个神情漠然。这群人身上有特别明显的标示：农民打工者。标示于哪些地方？宿命的表情？简陋的穿着？还是某种因对自我身份的认知而流露出来的气质？在他们的脸上，有一种被自觉认同了的命运属性。农民被局限于一个无形但却有明确界限的围墙之内，这围墙是几千年的历史累积而成，牢不可破。农民自觉退让，围墙越来越高，也越来越坚固。</p>
</li>
<li>
<p>青哥的房间有一种显见的匮乏。这一匮乏是属于个体生命的内向而又舒展的东西，是作为一个人应该拥有的悠闲，丰富。一盆花，一幅画，干净的地面，整齐的床铺桌椅，等等，都可以看作人对生活的信心和内心的某种亮光。青哥的房屋显示了他这一层面的枯燥、封闭和压抑。他被剥夺了，或者说自我剥夺了除挣钱之外人所应该拥有的一切，哪怕最微小的那一点。完完全全的枯燥，没有一点空间和亮光。他在这个城市，仿佛一个小偷，不光彩地偷一点钱，没羞没耻地生活。他的小屋就是这一不光彩的存在的表征。</p>
</li>
<li>
<p>“工人在劳动中耗费的力量越多，他亲手创造出来反对自身的，异己的对象世界的力量就越强大，他自身、他的内部世界就越贫乏，归他所有的东西就越少。”“农民工”和“新生代农民工”在现代都市的存在方式反而最典型地体现了现代人在精神上的贫乏状态。这是一个孤独与疏离的时代。这一批城市流浪者无法战胜疏离，劳累和孤独所带来的摧残性的忧郁，无法战胜无用感、无根感和自卑感。</p>
</li>
<li>
<p>你说我将来在不在梁庄住？这个还真难说。还是不能去预判百分之八十的可能是不会在村里，也不太方便。在外面找不到归属感的话，总是想回家。你在外面如果有归属感的话，可能这种感觉会比较淡一点。现在的中国人，尤其是农民和我这样的打工者，在哪个城市都没有归属感，家庭也分离，所以才老想着回家，不然哪有春运？</p>
</li>
<li>
<p>是的，这才是“深圳”。当我们说“春天的故事”“南方的神话”，当我们说“取得了举世瞩目的成就”时，我们指的是这个深南大道、滨河大道和北环大道的深圳，指的是那富士康加工厂和无数个企业累积出来 GDP 的深圳。他不包含那拥挤在沙河街上和居住在富士康那带铁丝网的宿舍里面的打工者，不包含梁磊那个出租屋和他所面临的焦虑。</p>
</li>
<li>
<p>金（人名）突然在异地死亡，家里人连想都没想，就把他往家带。他们为什么要长途奔走，花钱，费时费力，忍受着异味，回到那个村庄？因为村庄是他的家。那个城市，跟他没有任何关系。葬在那里，只能是孤魂野鬼。哪怕是相貌改变，异味冲天，他也要回家。</p>
</li>
<li>
<p>无边无际的黑暗。远处隐约闪现着城市的灯光，近处黑黢黢的物体的阴影，非常庞大。阳阳趴在那个养猪场的矮墙上，一声不吭。我走过去，蹲在他身边，他的身子抖动着，委屈地啜泣着。让人沉没的寂静与黑暗，“就像那两个孩子，与世隔离，只有知更鸟听他们的哭泣。”阳阳，没有朋友的阳阳，那古老的英国童话中被坏人抛弃在森林里的两个姐弟，他们的孤单、哭泣只有森林和大地知道。阳阳也是孤单的。来这儿的两天，我发现光亮叔们在万家窝子的这一片聚集区，确实没有一个小朋友。那些幼儿园里的小伙伴都朝村庄的另一方向去了，那是万家窝子居民的新楼区，只有阳阳一人，走向这低矮的、破败的老屋区。那一天下午，我想让阳阳带我去新房区的另一边看看，阳阳扭着身子，坚决不去。我说，阳阳，那里有你的小伙伴啊，你怎么不去？阳阳摇摇头，也不说话。他不爱说话。</p>
</li>
<li>
<p>“既然你把事做的这么绝，咱也没有办法”。这些粗杆子农民工以怠工、偷窃、破坏的方式来弥补损失，以实现他们没有得到的“正义”。美国农民政治学佳詹姆斯·<span v-pre="" class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>C</mi></mrow><annotation encoding="application/x-tex">C</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span></span></span></span>·斯科特把这一消极怠工形式称为“农民反抗的日常形式”。这一日常形式不会成为头条新闻，不会引起剧烈的社会震荡，但是，却是一股强大的暗流，这一暗流以隐蔽的、负面的方式存在，怠工、偷盗、破坏、吵架、装糊涂、装傻卖呆、诽谤等等都是最基本的方式，它阻碍着农民在城市化过程中的心理嬗变。我们通常会把这些归结为农民的劣根性，但其实，这却是一个弱势群体，一个有强烈的被压迫感的群体所唯一拥有的反抗方式。他们的反抗只能以匿名的，不合法的方式进行，或者说，这是一种自救式犯罪。</p>
</li>
<li>
<p>这些无名死亡，这些慢性中毒并没有引起足够的重视。在青岛，在无数个青岛，这些事件都只变为家庭的悲伤，变为一种莫名的消沉，没有在公共层面引起任何的回响。除非像郑州那位矽肺工人那样，开胸验肺。但即使如此，又怎样呢？每年仍有无数的农民工矽肺病人产生，他们已丧失劳动能力，被辞退或无声死亡，又有谁去认真听他们那艰难的呼吸声，去关心他们瘦骨嶙峋的身体和无声无息的死亡？小柱也已经死了十一年，他所在的工厂，从青岛市郊搬到万家窝子，可是，车间的环境改善能有多少呢？那蒸腾的、滞重的蒸汽还是如此浓厚地“环抱”着工人们，“环抱”着土壤、空气和不远处的大海。</p>
</li>
<li>
<p><strong>离开村落的人们流浪很久了，许多人说不定死在半路上</strong></p>
</li>
<li>
<p>一个村庄里，一个人的死亡也是所有人经历的以此死亡。一次葬礼就是一次心灵教育，通过哀哭、跪拜、呼唤，在世的人和去世的人融为一体，共同完成生命的轮回。在这过程中，观者的悲凉之感会时时涌现，然而也会因熟悉而产生一种温馨感和归属感。沿着这条路，我们可以找到家，可以走向那里的亲人的怀抱。</p>
</li>
<li>
<p>然而，如何能够真正呈现出“农民工”的生活，如何能够呈现出这一生活背后所蕴含的我们这一国度的制度逻辑、文明冲突和性格特征，却是一件非常困难的事情。并非因为没有人描述过或关注过他们，恰恰相反，而是因为被谈论过多。大量的新闻、图片和电视不断强化，要么是呼天抢地 悲剧、灰尘满面的麻木，要么是挣到钱的幸福、满意和感恩，还有那在中国历史中不断闪现的“下跪”风景，仿佛这便是他们存在形象的全部。“农民工”，已经成为一个包含着诸多社会问题，歧视、不平等、对立等复杂含义的词语，它包含着一种社会成规和认知惯性，会阻碍我们去理解这一词语背后更复杂的社会结构和生命存在。</p>
</li>
</ul>
<p>复杂性还远不止这些。农村与城市在当代社会中的结构性矛盾被大量地简化，简化为传统和现代、贫穷和富裕、愚昧和文明的冲突，简化为一个线性的、替代的发展，简化为一个民族的新生和一个国度的兴起的必然性。我们对农村、农民和传统的想象越来越狭窄，对幸福、新生活和现代的理解力也越来越一元化。实际上，在这一思维观念下，“农民工”非但没有成为市民，没有接受到公民教育，反而更加“农民化”。</p>
<h3>《梁庄十年》</h3>
<ul>
<li>在每一个村庄里，都有不可言说的女孩。</li>
</ul>
<p>那些女孩，或者因为漂亮，或者因为某种遭遇，或者因为行为超出了人们的理解力，而变成了灰色的存在。说起她们时，人们会互相看一眼，那一眼很深很深，好像那些女孩子就埋在那很深很深的后面，任期发酵、腐烂，最后被人遗忘。每一次提起，都是一次发酵，这发酵把女孩推向眼神的更深处。</p>
<p>……</p>
<p>可是，命运有时非常奇怪。</p>
<p>因为谈到燕子，我想起少年时代我身边的那些女孩子们，村庄里的、初中的同学，她们的脸庞、笑容、神情，就像某种烙印一样，在我心中留下深刻的印记。环绕她们的是一圈圈明亮灿烂的光环，在那光环之中，她们仍活着，仍拥有少年时代的美丽。我突然有种强烈的愿望，想一一找到她们，想知道她们都在哪里，过的怎么样，现在是什么样子。</p>
<ul>
<li>
<p>快到吴镇中心小学时，突然听到震耳欲聋的音乐声。循声而去，看到一个人正在路中央跳舞。只见这个人头戴一顶艳红的宽沿帽子，帽檐上一个硕大的红色蝴蝶结将飞欲飞，上身穿一件橘红色环卫服的夹克，下渗穿一件暗红色夹裙，脚踏一双暗红运动鞋。她手拿扫把，脚下滑动着太空步，身体随音乐节奏不断摇摆，动感十足，整个人都沉浸在音乐和节奏里。后退、前进、摇摆，铿锵的鼓点似乎是她的脚步敲击出来的，在大地上肆意回响。她旁边是一辆三轮垃圾车，上面有拖把、大桶，还有一些凸出来的纸盒之类的东西。</p>
</li>
<li>
<p>吴桂兰正处在这样的惩罚中。她被整个吴镇孤立和遗忘，被自己的儿女孤立和遗忘。她瘫痪在床的老头，是她被惩罚的显在标记。“谁和她说话？”即使是闲言碎语，吴桂兰也不配。也许，这是我这么多年来从没听说过她名字的原因。</p>
</li>
</ul>
<p>我不知道吴桂兰有没有意识到自己在收到惩罚。她眼神中的渴望，她所弄出来的巨大声响，她三十年如一日地在吴镇大街上跳舞，似乎在反抗，也似乎在召唤。她兀自舞着，显示出自己的力量，也释放着善意和无望的呐喊。</p>
<ul>
<li>
<p>在我的记忆里，明太爷还是那个和我父亲彻夜长坐、沉默不语的中年人：漫漫冬夜，他们坐在堂屋的角落，守着一个燃烧的大树根，身体缩着，手伸向火。他们在想什么，他们彼此的慰藉是什么，我一直都很好奇。我是多么希望那个时候我就是一个大人，能感受到他们沉默中的交流。</p>
</li>
<li>
<p>她又恢复了愉悦、轻快的神情，让大家站定，带头唱起来，声音清亮纯净。她的声音携带着某种奇怪的信息，慈爱，有回音，就像来自苍穹深处，那里有宽广的时间和空间。</p>
</li>
</ul>
<p>我偷偷睁眼看了一下，灵兰大奶奶双手紧握，头微低，神情非常严肃、虔诚。我赶紧闭上眼睛，听着亲切的乡音，那乡音正在呼唤居于万物之中的上帝，让他看顾、祝福他的女儿，并救他们脱离凶恶。我感觉自己也慢慢进入到某种状态——无我的、舒缓的时间长流，无始无终的原初状态。我似乎有些理解，并且羡慕灵兰大奶奶了。</p>
<p>这座明亮的、干净的、被主照看的房屋，再也没有任何明太爷的痕迹。那个致命的水缸，连同他的修理器具、被褥衣服，满院的荒草、颓败，满世界的叫骂和不满，统统都被扔掉。</p>
<p>明太爷从这个世上彻底消失了。</p>
<h3>《哈姆雷特》</h3>
<ul>
<li><strong>雷欧提斯</strong></li>
</ul>
<p>不过如此，因为像新月一样逐渐饱满的的人生，不仅是肌肉和体格的成长，而且随着身体的发展，精神和心灵也同时扩大。</p>
<p>也许他现在爱你，他的真诚和意志是纯洁而不带欺诈的；</p>
<p>可是你必须留心，他有这样高的地位，他的意志并不属于他自己，因为他自己也要被他的血统所支配；</p>
<p>他不能像一般庶民一样为自己选择，因为他的决定足以影响到整个国家的安危，他是全身的首脑，他的选择必须得到各部分肢体的同意；</p>
<p>所以要是他说，他爱你，你不可贸然相信，应该明白：</p>
<p>照他的身份地位来说，他要想把自己的话付诸实现，绝不能越出丹麦国内普遍舆论所同意的范围。</p>
<p>你再想一想，要是你用过于轻信的耳朵聆听他的歌曲，让他攫走了你的心，在他的狂妄的渎求之下，打开了你的宝贵的童贞，那时候你的名誉将要蒙受多大的损失。</p>
<p>留心，奥菲利娅，留心，我的亲爱的妹妹，不要放纵你的爱情，不要让欲望的利箭把你射中。</p>
<p>一个自爱的女郎不应该向月亮显露她的美貌；</p>
<p>圣贤也不能逃避谗口的中伤；</p>
<p>春天的草木往往还没有吐放它们的蓓蕾，就被蛀虫蠹蚀；</p>
<p>朝露一样晶莹的青春，常常会受到罡风的吹打。</p>
<p>所以留心吧，戒惧是最安全的方案；</p>
<p>即使没有旁人的诱惑，少年的血性也要向他自己叛变。</p>
<ul>
<li><strong>哈姆雷特</strong></li>
</ul>
<p>生存还是毁灭，这是一个值得考虑的问题；</p>
<p>默然忍受命运的暴虐的毒箭，或是挺身反抗人世的无涯的苦难，在奋斗中结束了一切，这两种行为，哪一种是更勇敢的？</p>
<p>死了，睡着了，什么都完了；</p>
<p>要是在这一种睡眠之中，我们心头的创痛，以及其他无数血肉之躯所不能避免的打击，都可以从此消失，那正是我们求之不得的结局。</p>
<p>死了，睡着了；睡着了也许还会做梦；</p>
<p>恩，阻碍就在这儿：</p>
<p>因为当我们摆脱了这一句腐朽的皮囊以后，在那死的睡眠里，究竟将要做些什么梦，那不能不使我们踌躇顾虑；</p>
<p>人们甘心久困于患难之中，也就是为了这个缘故。</p>
<p>谁愿意忍受人世的鞭挞和讥嘲，压迫者的凌辱，傲慢者的冷眼，被轻蔑的爱情的惨痛，法律的迁延，官吏的横暴，和俊杰人才费尽辛勤所换来的鄙视，要是他只要用一柄小小的刀子，就可以清算他自己的一生，谁愿意负着这样的重担，在烦劳的生命的压迫下呻吟流汗？</p>
<p>倘不是因为惧怕而不知的死后，惧怕那从来不曾有一个旅人回来过的神秘之国，是它迷惑了我们的意志，使我们宁愿忍受目前的折磨，不敢向我们所不知道的痛苦飞去？</p>
<p>这样，重重的顾虑使我们全成为了懦夫，决心的赤热的光彩，被审慎的思维盖上了一层灰色，伟大的事业在这一种考虑之下，也会逆流而退，失去了行动的意义。</p>
<p>且慢！</p>
<p>美丽的奥菲利娅！——女神，在你的祈祷之中，不要忘记替我忏悔我的罪孽。</p>
<h3>《陶庵梦忆》</h3>
<ul>
<li><strong>引文：袁石公笔下的荷花池</strong>
其男女之杂，灿烂之景，不可名状。大约露帏则千花竞笑，举袂则乱云出峡，挥扇则星流月映，闻歌则<strong>雷辊</strong>涛趋。（<strong>雷辊</strong>：雷声轰鸣，如滚动的车轮发出的声响）</li>
</ul>
<p>张岱的评价：</p>
<p>盖恨<strong>虎丘</strong>中秋夜之模糊躲闪，特至是日而明白昭著之也。（<strong>虎丘</strong>：在今江苏苏州西北，相传春秋时吴王夫差葬其父于此，葬后三日有白虎踞其上，故有此称）</p>
<hr>
<ul>
<li><strong>张岱笔下的砚台</strong>
燕客捧出，<strong>赤比马肝</strong>，酥润如玉，背隐白丝类玛瑙，<strong>指螺细篆</strong>，面三星坟起如弩眼，着墨无声而墨尘烟起，一生<strong>痴瘛</strong>，口张而不能翕。燕客属余铭，铭曰：“女娲炼天，不分玉石；<strong>鳌血芦灰</strong>，烹霞铸日；星河溷扰，<strong>参横箕翕</strong>。”</li>
</ul>
<p><strong>赤比马肝</strong>：端砚以赤紫为贵；</p>
<p><strong>指螺细篆</strong>：像指头般细小的篆书；</p>
<p><strong>痴瘛</strong>：呆痴；</p>
<p><strong>鳌血芦灰</strong>：古代神话传说，女娲以五色石补天，折鳌四足以支四极，积芦灰以堵洪水。</p>
<p><strong>参横箕翕</strong>：参、箕：星宿名，同为二十八星宿之一。此处指砚台上的星星。</p>
<hr>
<ul>
<li><strong>鲁藩烟火</strong>
兖州鲁藩烟火妙天下。烟火必张灯，鲁藩之灯，灯其殿、灯其壁、灯其楹柱、灯其屏、灯其座、灯其宫扇伞盖。诸王公子、宫娥僚属、队舞乐工，尽收为灯中景物。及放烟火，灯中景物又收为烟火中景物。天下之看灯者，看灯灯外；看烟火者，看烟火烟火外。未有身入灯中、光中、影中、烟中、火中，闪烁变幻，不知其为王宫内之烟火，亦不知其为烟火内之王宫也。</li>
</ul>
<p>……端门内外，烟焰蔽天，月不得明，露不得下。看者耳目攫夺，屡欲<strong>狂易</strong>，恒内手持之。</p>
<p><strong>狂易</strong>：因发狂而改变形态</p>
<hr>
<ul>
<li><strong>朱云崃女戏</strong>
西施歌舞，对舞者五人，长袖缓带，绕身若环，曾挠摩地，扶旋倚那，弱如求药。女宫内侍，执扇葆璇盖、金莲宝炬、纨扇宫灯二十余人，光焰荧煌，锦绣纷叠，见者错愕。</li>
</ul>
<hr>
<ul>
<li></li>
</ul>
</text>`,r:{minutes:17.79,words:5337},y:"a",t:"汉语名著阅读"}}],["/article/software.html",{loader:()=>A(()=>import("./software.html-BQg42coe.js"),__vite__mapDeps([12,1])),meta:{d:17080416e5,l:"2024年2月16日",c:"推荐",g:"文章",e:`
<h2>Windows</h2>
<h3>PC 管理</h3>
<h4>Tai</h4>
<p><a href="https://github.com/Planshit/Tai" target="_blank" rel="noopener noreferrer">项目地址</a></p>
<p>该软件用于统计 Windows 各应用或网站的使用时长，统计准确，图表直观。</p>
<h4><a class="header-anchor" href="#bandzip"><span></span></a><a href="https://www.bandisoft.com/" target="_blank" rel="noopener noreferrer">Bandzip</a></h4>`,r:{minutes:2.1,words:631},y:"a",t:"软件推荐"}}],["/article/weakness.html",{loader:()=>A(()=>import("./weakness.html-XTZoM2VM.js"),__vite__mapDeps([13,1])),meta:{d:1707929375e3,e:`
<h2>pip</h2>
<p>这是 Python 自带的包管理器，但是存在一定的问题，后将其弃用，改用<a href="/study/code/python.html#poetry-%E5%9C%A8%E7%94%A8" target="_blank">poetry</a></p>
<p>问题 1：需要借用 Anaconda 进行虚拟环境管理，体量大，无形间将 Python 的磁盘占用率又提升了一个档次</p>
<p>问题 2：对包的依赖管理差。比如在安装“Pyinstaller”这个包时，pip 需要先安装这个包的依赖，但是在删除“Pyinstaller”时，并不会将其连带的依赖一并删除，导致虚拟环境中存在大量无用的依赖包，臃肿冗余。</p>`,r:{minutes:3.62,words:1086},y:"a",t:"产品吐槽"}}],["/article/web.html",{loader:()=>A(()=>import("./web.html-D1zc3Npi.js"),__vite__mapDeps([14,1])),meta:{d:1707929375e3,e:`
<h2>数模论文绘图网站推荐</h2>
<h3>色彩空间 ColorSpace</h3>
<p>网址（单击即可跳转）：<a href="https://mycolor.space/" target="_blank" rel="noopener noreferrer">ColorSpace</a></p>
<p>输入一种颜色后，可生成许多种调色搭配，相较于下面推荐的Adobe Color更具可选性，方案选择更多样</p>
<h3>素材网站 Freepik</h3>
<p>网址（单击即可跳转）：<a href="https://www.freepik.com/" target="_blank" rel="noopener noreferrer">Freepik</a></p>`,r:{minutes:2.98,words:895},y:"a",t:"网站推荐"}}],["/blog/",{loader:()=>A(()=>import("./index.html-DoIjmti_.js"),__vite__mapDeps([15,1])),meta:{d:17079552e5,l:"2024年2月15日",c:"博客",g:"index",e:`
<p>🎉 欢迎来到我的博客，这里是有关博客的配置信息。</p>
<h2>主题变迁</h2>
<p><code>2022-07-26</code> 我第一次搭建此博客时，采用的是<a href="https://v2.vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">vuepress2 提供的默认主题</a>，但默认主题功能少，并且存在较多 bug，最后博客逐渐停更。</p>
<p><code>2024-02-15</code> 我受朋友启发，将博客主题修改为<a href="https://theme-hope.vuejs.press/zh/" target="_blank" rel="noopener noreferrer">vuepress-theme-hope</a>，该主题相较于默认主题提供了更多可选的扩展包，功能性强；并且顺便优化和完善了博客的文档结构。</p>`,r:{minutes:1.64,words:492},y:"a",t:"Dream_oyh 的 blog",i:"vue"}}],["/blog/log.html",{loader:()=>A(()=>import("./log.html-BNiz7md4.js"),__vite__mapDeps([16,1])),meta:{d:1707929375e3,c:"博客",g:"日志",e:`
<h2>2024/02/17-2024/02/20</h2>
<p>更新大量 <em>Pytorch</em> 内容</p>
<h2>2024/02/16</h2>
<ul>
<li>新增<em>shell</em>内容</li>
</ul>
<h2>2024/02/15</h2>
<ul>
<li>为<em>编程</em>板块添加图标</li>
<li>优化<em>English</em>板块文章结构</li>
<li>优化<em>latex</em>板块，以适应新主题的 katex 新编译引擎</li>
<li>更新<em>正则表达式</em>内容</li>
</ul>
<h2>2024/02/14</h2>`,r:{minutes:6.3,words:1890},y:"a",t:"博客日志",i:"blog-solid"}}],["/blog/schedule.html",{loader:()=>A(()=>import("./schedule.html-CwnP4D8b.js"),__vite__mapDeps([17,1])),meta:{d:1707976316e3,c:"博客",g:"计划",n:!0,r:{minutes:.44,words:133},y:"a",t:"博客日程",i:"check"}}],["/blog/spots.html",{loader:()=>A(()=>import("./spots.html-BSv0XfRH.js"),__vite__mapDeps([18,1])),meta:{d:1707976316e3,c:"博客",e:`
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>本部分罗列了开发博客时常用的站点跳转，方便日后查询。</p>
</div>
<p><a href="https://theme-hope.vuejs.press/zh/guide/" target="_blank" rel="noopener noreferrer">vuepress-theme-hope 主题官方中文指南</a></p>
<p><a href="https://theme-hope.vuejs.press/zh/cookbook/markdown/emoji/" target="_blank" rel="noopener noreferrer">emoji 查询</a></p>`,r:{minutes:.26,words:77},y:"a",t:"博客常用站点跳转",i:"at"}}],["/blog/vuepress.html",{loader:()=>A(()=>import("./vuepress.html-Dw7Fr3Oj.js"),__vite__mapDeps([19,1])),meta:{d:16587936e5,l:"2022年7月26日",c:"博客",g:"问题记录",e:`
<h2>github 图床建立</h2>
<p>建立 tuchuang.sh 脚本，脚本内容如下（在 git bash 中运行命令）：</p>
<p>首先需要在 github 中创建 images 分支，作图床载体</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token operator">&lt;</span>文件目录地址<span class="token operator">&gt;</span> <span class="token comment">#我这里是docs/.vuepress/public/images    # 1.进入images文件目录下</span>
<span class="token function">git</span> init      <span class="token comment"># 2.创建仓库</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>     <span class="token comment"># 3.添加目录下所有文件至暂存区</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:dream-oyh/dream-oyh.github.io.git     <span class="token comment"># 4.连接远程仓库</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'注释'</span>    <span class="token comment">#此处注释可改为$(date "+%Y%m%d-%H:%M:%S")，以用系统时间代替</span>
<span class="token function">git</span> branch <span class="token parameter variable">-m</span> images
<span class="token function">git</span> push <span class="token parameter variable">-u</span> <span class="token parameter variable">-f</span> origin images
</code></pre></div>`,r:{minutes:4.04,words:1211},y:"a",t:"问题列表",i:"ask"}}],["/code/Linux.html",{loader:()=>A(()=>import("./Linux.html-7xYEBaYU.js"),__vite__mapDeps([20,1])),meta:{d:17083872e5,l:"2024年2月20日",c:["计算机","底层"],g:"笔记",e:`
<p>我对 Linux 的了解不深，甚至可以说只知道<code>sudo</code>在命令行提权，其他都没有做很深入的了解，目前我电脑上搭载的是 win 和 kubuntu 的双系统，之前在安装正统 ubuntu 的时候出现了极大的困难（读取不到显卡导致屏幕亮度无法调暗，极其影响使用体验）最后在朋友的帮助下安装了<code>kubuntu</code>。但是由于之前只分配了 40G 的内存，现在 linux 内存告急，以扩容为契机，我准备系统学习一下 linux 操作系统，所以也就新增了这个版块。</p>
<h2>学习资料</h2>
<p>在一个野生计算机学习者面前，目前我有的最详尽的资料就是<a href="https://absx.pages.dev/articles/linux" target="_blank" rel="noopener noreferrer">绝对值_x 博客里的 Linux 介绍</a></p>`,r:{minutes:3.16,words:948},y:"a",t:"Linux",i:"linux"}}],["/code/git.html",{loader:()=>A(()=>import("./git.html-aTV6eVml.js"),__vite__mapDeps([21,1])),meta:{d:17073504e5,l:"2024年2月8日",c:"工具",g:"教程",e:`
<h2>学习材料</h2>
<p><a href="https://learngitbranching.js.org/?locale=zh_CN" target="_blank" rel="noopener noreferrer">畅游提交树学习网站</a></p>
<p><a href="https://absx.pages.dev/coding/Git.html" target="_blank" rel="noopener noreferrer">绝对值_x 个人博客</a></p>
<h2>安装与配置</h2>
<h3>Git 的安装</h3>
<ul>
<li>方法一：</li>
</ul>`,r:{minutes:11.36,words:3407},y:"a",t:"Git",i:"git"}}],["/code/github.html",{loader:()=>A(()=>import("./github.html-DnIa3uWu.js"),__vite__mapDeps([22,1])),meta:{d:17089056e5,l:"2024年2月26日",c:"工具",g:"教程",e:`
<blockquote>
<p>GitHub is a developer platform that allows developers to create, store, manage and share their code. --WikiPedia</p>
</blockquote>
<p><a href="https://github.com/" target="_blank" rel="noopener noreferrer">官网</a></p>
<p><a href="https://github.com/dream-oyh" target="_blank" rel="noopener noreferrer">我的 github 账号首页</a></p>`,r:{minutes:1.81,words:544},y:"a",t:"Github",i:"github"}}],["/code/html.html",{loader:()=>A(()=>import("./html.html-Dah8SBR8.js"),__vite__mapDeps([23,1])),meta:{d:17022528e5,l:"2023年12月11日",c:"前端",g:"教程",e:`
<h2>学习</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML" target="_blank" rel="noopener noreferrer">MDN</a> 提供了较为完整的前端三大件学习资源，可以参考学习。</p>
<h2>html 语法积累</h2>
<h3>“test”字体样式修改：</h3>
<div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">font-family</span><span class="token punctuation">:</span>Times New Roman<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,r:{minutes:.84,words:252},y:"a",t:"html",i:"html5"}}],["/code/",{loader:()=>A(()=>import("./index.html-BSFDu7Cl.js"),__vite__mapDeps([24,1])),meta:{d:17079552e5,l:"2024年2月15日",c:"编程",g:"index",e:`
<h2>学习路径</h2>
<ul>
<li>2022-02(大一下)，因为学校的课程安排，入门了 C++，但是现在已经忘光了，在单片机原理课上准备捡回来重新学</li>
<li>2022-03，因为参加了纽狐科技公司的交通项目，开始接触 matlab，做一些简单的数据处理</li>
<li>2022-07，和队友一起备战数模，仍然在使用 matlab 作为数据处理的主力工具</li>
<li>2023-11，此时开始正式转入 python 做课程设计，写了第一个控制工程的 python GUI 项目</li>
<li>2023-12，matlab 课程结业后，立即在电脑上卸载了 matlab，全力转向 python 作为主力语言</li>
<li>2024-01，寒假期间制作了视频流分段打标签的 labeling 工具，为之后的交科赛做准备；同时，出于个人兴趣，开始接触 html 等前端三大件</li>
</ul>`,r:{minutes:1.1,words:330},y:"a",t:"编程",i:"code"}}],["/code/latex.html",{loader:()=>A(()=>import("./latex.html-Bdpi0vGR.js"),__vite__mapDeps([25,1])),meta:{d:17079552e5,l:"2024年2月15日",c:"工具",g:"教程",e:`
<p>核心思想：内容与格式的分离</p>
<h2>安装与学习</h2>
<p>安装：见知乎老哥专栏：<a href="https://zhuanlan.zhihu.com/p/56982388" target="_blank" rel="noopener noreferrer">如何安装 latex</a></p>
<p>但是我选择把<span v-pre="" class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mtext>LaTeX</mtext></mrow><annotation encoding="application/x-tex">\\LaTeX</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8988em;vertical-align:-0.2155em;"></span><span class="mord text"><span class="mord textrm">L</span><span class="mspace" style="margin-right:-0.36em;"></span><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6833em;"><span style="top:-2.905em;"><span class="pstrut" style="height:2.7em;"></span><span class="mord"><span class="mord textrm mtight sizing reset-size6 size3">A</span></span></span></span></span></span><span class="mspace" style="margin-right:-0.15em;"></span><span class="mord text"><span class="mord textrm">T</span><span class="mspace" style="margin-right:-0.1667em;"></span><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.4678em;"><span style="top:-2.7845em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord textrm">E</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2155em;"><span></span></span></span></span><span class="mspace" style="margin-right:-0.125em;"></span><span class="mord textrm">X</span></span></span></span></span></span>集成进 VSCode，集成教程可以看这篇文章：<a href="https://zhuanlan.zhihu.com/p/166523064" target="_blank" rel="noopener noreferrer">Visual Studio Code (vscode) 配置 LaTeX</a></p>`,r:{minutes:14.37,words:4311},y:"a",t:"Latex 公式编辑器",i:"latex"}}],["/code/markdown.html",{loader:()=>A(()=>import("./markdown.html-DtMT7afL.js"),__vite__mapDeps([26,1])),meta:{d:16995744e5,l:"2023年11月10日",c:"笔记",g:"教程",e:`
<h2>Markdown 是什么</h2>
<p>Markdown 是一种轻量级的「标记语言」，它的优点很多，目前也被越来越多的写作爱好者，撰稿者广泛使用。Markdown 的语法十分简单。相对于更为复杂的 HTML 标记语言来说，Markdown 可谓是轻量级的产品，相较于日常广泛使用的 word，markdown 语言能够使文档内容在不同的设备间无损传递，具有良好的兼容性。</p>
<p>综上所述，Markdown 是一种简单的、轻量的、兼容性强的电子笔记工具</p>
<h2>Markdown 使用语法积累</h2>
<h3>表格绘制</h3>
<div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code>| 表头 | 表头 |
| ---------- | ---------- | # 区分表头和单元格
| 单元格 | 单元格 |
| 单元格 | 单元格 |
</code></pre></div>`,r:{minutes:1.16,words:349},y:"a",t:"Markdown",i:"markdown"}}],["/code/python.html",{loader:()=>A(()=>import("./python.html-CkdkfcIa.js"),__vite__mapDeps([27,1])),meta:{d:17060544e5,l:"2024年1月24日",c:"编程",g:"教程",e:`
<h2>为什么我选择了 Python</h2>
<p>从大一我就开始接触 MATLAB，并且认为 python 能做的，MATLAB 也能做，而且实现起来更简单，毕竟 MATLAB 作为一个已经商业化的工具，其工作区的可视化和交互性、对于环境的依赖程度确实是 python 不可比拟的。</p>
<p>但是 MATLAB 完整体量高达 50G，对于磁盘的占用率是不言而喻的，Python 借用包管理器，将体量减小到 MATLAB 远不及的水平。其次，MATLAB 在拟合、神经网络、深度学习等领域，采用已经打包好的工具箱，这对于算法学习是极其不利的，但是 Python 通过各种库的调用，能够从底层逻辑实现各算法，对于个人学习而言是更为有益的。</p>`,r:{minutes:2.89,words:866},y:"a",t:"Python",i:"python"}}],["/code/shell.html",{loader:()=>A(()=>import("./shell.html-Kn9tS8kY.js"),__vite__mapDeps([28,1])),meta:{d:17080416e5,l:"2024年2月16日",c:["计算机","底层"],g:"教程",e:`
<h2>学习</h2>
<p><a href="https://missing-semester-cn.github.io/" target="_blank" rel="noopener noreferrer">The Missing</a></p>
<p>本文采用 Bourne Again Shell（bash）来学习 Shell 命令行的使用。</p>
<h2>Shell 的本质</h2>
<div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">date</span> <span class="token comment"># 输出时间</span>
<span class="token builtin class-name">echo</span> <span class="token operator">&lt;</span>str<span class="token operator">&gt;</span> <span class="token comment"># 输出字符串</span>
</code></pre></div>`,r:{minutes:5.33,words:1598},y:"a",t:"Shell",i:"powershell"}}],["/code/vim.html",{loader:()=>A(()=>import("./vim.html-Jy6GbKrU.js"),__vite__mapDeps([29,1])),meta:{d:17080416e5,l:"2024年2月16日",c:["计算机","底层"],g:"教程",e:`
<blockquote>
<p>Vim 是从 vi 发展出来的一个文本编辑器。其代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。——<a href="https://zh.wikipedia.org/wiki/Vim" target="_blank" rel="noopener noreferrer">维基百科</a></p>
</blockquote>
<p>Vim 是一个多模态编辑器：它对于插入文字和操纵文字有不同的模式。Vim 是可编程的（可以使用 Vimscript 或者像 Python 一样的其他程序语言），Vim 的接口本身也是一个程序语言：键入操作（以及其助记名）是命令，这些命令也是可组合的。Vim 避免了使用鼠标，因为那样太慢了；Vim 甚至避免用上下左右键因为那样需要太多的手指移动。</p>`,r:{minutes:4.54,words:1361},y:"a",t:"vim 编辑器",i:"vim"}}],["/code/vscode.html",{loader:()=>A(()=>import("./vscode.html-lMzF4Nw2.js"),__vite__mapDeps([30,1])),meta:{d:1707929375e3,c:"工具",g:"教程",e:`
`,r:{minutes:.03,words:9},y:"a",t:"VSCode",i:"vscode"}}],["/credit/",{loader:()=>A(()=>import("./index.html-C21kV8Iz.js"),__vite__mapDeps([31,1])),meta:{d:1708128e6,l:"2024年2月17日",c:"资料站",g:"index",e:`
<h2></h2>
<p><strong>资料站主要内容</strong>：中南大学交通院与计算机院大多数公共课与部分专业课的课程备考资料</p>
<p>资料站以<code>Dream-oyh的blog</code>为中心站点，将电子版文档部署在 </p>
`,r:{minutes:6.07,words:1821},y:"a",t:"资料站",i:"folder"}}],["/code/python/Seaborn.html",{loader:()=>A(()=>import("./Seaborn.html-DYy3U1v1.js"),__vite__mapDeps([32,1])),meta:{d:17075232e5,l:"2024年2月10日",c:"Python 库",g:"教程",e:`
<blockquote>
<p>Seaborn is a Python data visualization library based on matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.</p>
</blockquote>
<p><a href="https://seaborn.pydata.org/" target="_blank" rel="noopener noreferrer">官方文档</a></p>
<p>相较于 matplotlib，<code>Seaborn</code> 提供了 API 封装，使得图形绘制较底层的 matplotlib 更简单，也兼容了 numpy、Pandas 等数据处理库，兼容性好。同时，<code>Seaborn</code>库提供了更为高级的绘图功能，支持多维数据处理。</p>`,r:{minutes:2.56,words:769},y:"a",t:"Seaborn",i:"Graph"}}],["/code/python/pandas.html",{loader:()=>A(()=>import("./pandas.html-BD4xmsxf.js"),__vite__mapDeps([33,1])),meta:{d:17074368e5,l:"2024年2月9日",c:"Python 库",g:"教程",e:`
<h2>学习</h2>
<p><a href="https://pandas.pydata.org/docs/index.html#" target="_blank" rel="noopener noreferrer">官方文档</a></p>
<h2>安装</h2>
<div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code>poetry <span class="token function">add</span> pandas
</code></pre></div><h2>数据结构</h2>`,r:{minutes:4.51,words:1352},y:"a",t:"Pandas",i:"pandas"}}],["/code/python/web_crawler.html",{loader:()=>A(()=>import("./web_crawler.html-8l9Hpb6i.js"),__vite__mapDeps([34,1])),meta:{d:17076096e5,l:"2024年2月11日",c:"Python 库",g:"教程",e:`
<h2>环境安装</h2>
<p>使用爬虫需要安装<code>requests</code>和<code>bs4</code>两个第三方库</p>
<p>安装命令为：</p>
<div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code>poetry <span class="token function">install</span> requests
poetry <span class="token function">install</span> bs4
</code></pre></div>`,r:{minutes:5.34,words:1601},y:"a",t:"Python 爬虫教程",i:"pachong"}}],["/code/python/websocket.html",{loader:()=>A(()=>import("./websocket.html-DrtX6nDz.js"),__vite__mapDeps([35,1])),meta:{d:1708992e6,l:"2024年2月27日",c:"Python 库",g:"教程",e:`
<p>突然想学这个包是因为我院测试技术与信号处理课程作业，老师给出的题目是：“调用手机中的传感器，显示参数的动态变化”，经过一番搜索我发现了 python 中<code>websocket</code>这个包，可以实现实时的手机传感器数据传输。</p>
<h2>Sensor Server</h2>
<p><a href="https://github.com/umer0586/SensorServer" target="_blank" rel="noopener noreferrer">Sensor Server 的 Github 仓库链接</a></p>
<p>Github 提供了一个开源的 Android apk，名为：“Sensor Server”，可以用来提供移动端传感器接口，利用<code>ws</code>互联网协议传输数据。移动端启动后，会提供一个 url，我们需要保证 PC 和移动端均连接到该 url 上。</p>`,r:{minutes:2.68,words:803},y:"a",t:"Websocket",i:"bianzubeifen8"}}],["/code/tips/regex.html",{loader:()=>A(()=>import("./regex.html-BJmGpvSg.js"),__vite__mapDeps([36,1])),meta:{d:17080416e5,l:"2024年2月16日",c:"锦囊",g:"教程",e:`
<h2>是什么</h2>
<p>正则表达式（regular expressions），简称 regex，或 regexp，用于搜索或匹配字符串中符合某个模式的文本。</p>
<p>regex 在不同的编程语言下有不同的呈现形式，但是总体语法规则是不变的。</p>
<h2>学习</h2>
<p><a href="https://regex101.com/" target="_blank" rel="noopener noreferrer">正则表达式在线测试工具</a></p>
<p><a href="https://www.bilibili.com/video/BV1da4y1p7iZ" target="_blank" rel="noopener noreferrer">奇乐编程学院视频教程</a></p>`,r:{minutes:3.5,words:1051},y:"a",t:"正则表达式",i:"boolean"}}],["/english/china/10.22.html",{loader:()=>A(()=>import("./10.22.html-BPr1Mqhy.js"),__vite__mapDeps([37,1])),meta:{d:1707969149e3,e:`
<p>近日，中国科学院国家天文台利用被誉为“中国天眼”的 500 米口径球面射电望远镜（FAST）进行成像观测，在致密星系群及周围天区，发现了 1 个尺度大约为两百万光年的巨大原子气体系统。这是迄今为止，在宇宙中探测到的最大的原子气体系统。</p>
<p>The "China Sky Eye", also known as the Five-hundred-meter Aperture Spherical Radio Telescope (FAST), has spotted a huge atomic gas structure in the vicinity of a galaxy group. The linear scale of the atomic hydrogen structure reaches some two million light-years, the largest one of its kind ever discovered in the universe.</p>`,r:{minutes:1.89,words:566},y:"a",t:"10.22 原子气体结构  atomic gas structure"}}],["/english/china/10.23.html",{loader:()=>A(()=>import("./10.23.html-Do6jKWL4.js"),__vite__mapDeps([38,1])),meta:{d:1707969149e3,e:`
<p>第132届中国进出口商品交易会（广交会）10月15日线上开幕。10月17日，第132届广交会跨国头部企业供采对接周启动，助力中国外贸企业开拓国际市场。</p>
<p>The 132nd session of the China Import and Export Fair, also known as the Canton Fair, opened online on October 15. Organizers of the fair have launched a supply and purchase matchmaking event for leading multinational enterprise, which kicked off online on Monday, in order to help Chinese export-oriented businesses better make deals with global buyers.</p>`,r:{minutes:1.57,words:470},y:"a",t:"10.23 供采对接周 a supply and purchase matchmaking event"}}],["/english/china/10.24.html",{loader:()=>A(()=>import("./10.24.html-D_h1-h26.js"),__vite__mapDeps([39,1])),meta:{d:1707969149e3,e:`
<p>近日，广湛高铁湛江湾海底隧道工程盾构机累计掘进进尺3000米，入海超1600米，标志着广湛高铁项目建设实现又一重要节点突破。</p>
<p>The China Railway Design Corp announced on Oct. 20 that its Tunnel Boring Machine has already dug a 3,000-meter section of the Zhanjiang Bay undersea tunnel, some 1,600 meters of which runs under the seabed, marking an important stage in the construction of the Guangzhou-Zhanjiang high-speed railway.</p>`,r:{minutes:1.23,words:368},y:"a",t:"10.24 湛江湾海底隧道 Zhanjiang Bay undersea tunnel"}}],["/english/china/10.25.html",{loader:()=>A(()=>import("./10.25.html-BaUp33gk.js"),__vite__mapDeps([40,1])),meta:{d:1707969149e3,e:`
<p>海关总署 10 月 24 日发布数据，今年前三季度，我国货物贸易进出口总值 31.11 万亿元，同比增长 9.9%。具体来看，前三季度出口 17.67 万亿元，增长 13.8%；进口 13.44 万亿元，增长 5.2%。</p>
<p>China's foreign trade of goods jumped 9.9 percent year on year to 31.11 trillion yuan during the first nine months of the year, official data showed Monday. Exports rose 13.8 percent year on year to 17.67 trillion yuan, while imports increased 5.2 percent from a year ago to 13.44 trillion yuan, according to the General Administration of Customs.</p>`,r:{minutes:2.13,words:638},y:"a",t:"10.25 中国货物贸易 China's foreign trade of goods"}}],["/english/china/10.26.html",{loader:()=>A(()=>import("./10.26.html-CIJfS4PH.js"),__vite__mapDeps([41,1])),meta:{d:1707969149e3,e:`
<p>日前，一列满载纸浆、石英砂、建筑陶瓷等货物的集装箱列车抵达重庆。这是全国西部陆海新通道海铁联运班列今年开行的第7000列，于10月21日从广西钦州出发。</p>
<p>A cargo train carrying containers of goods, including paper pulp, quartz sand, and ceramics, arrived in southwest China's Chongqing Municipality on Oct. 22, marking the completion of the 7,000th rail-sea intermodal train trip running along the New International Land-Sea Trade Corridor this year. The train departed from Qinzhou port, Guangxi Zhuang autonomous region on Friday and arrived at the Tuanjie Village Station in Chongqing around 11 pm on Saturday.</p>`,r:{minutes:1.26,words:378},y:"a",t:"10.26 海铁联运班列  rail-sea intermodel train"}}],["/english/china/10.27.html",{loader:()=>A(()=>import("./10.27.html-COBvCVSS.js"),__vite__mapDeps([42,1])),meta:{d:1707969149e3,e:`
<p>10 月 24 日，全国人大常委会法制工作委员会发言人臧铁伟介绍，妇女权益保障法修订草案（三次审议稿）10 月将提请十三届全国人大常委会第三十七次会议审议。修订草案明确人力资源和社会保障部门可以联合工会、妇女联合会约谈用人单位，保护妇女劳动和社会保障权益。</p>
<p>A draft revision to the Law on the Protection of the Rights and Interests of Women will be further reviewed during an upcoming session of the Standing Committee of the National People's Congress, China's top legislature, which is set to convene from Oct. 26 to 30. Under the draft, the human resources and social security departments are also allowed to work with trade unions or women federations to have regulatory talks with employers if companies are found to be having trouble guaranteeing women's labor rights and interests, Zang Tiewei, spokesman for the NPC Standing Committee's Legislative Affairs Commission, said while introducing the draft's contents to media on Oct. 24.</p>`,r:{minutes:1.84,words:553},y:"a",t:"10.27 妇女权益保障法修订草案 the draft revision to the Law on the Protection of the Rights and Interests of Women"}}],["/english/china/10.28.html",{loader:()=>A(()=>import("./10.28.html-B40N_PBO.js"),__vite__mapDeps([43,1])),meta:{d:1707969149e3,e:`
<p>民政部日前会同相关部门和单位联合印发的指导意见明确指出，到 2023 年底前，我国将基本建立特殊困难老年人探访关爱服务机制。</p>
<p>China will basically establish a system of home visit and care services for the elderly with special difficulties before the end of 2023, according to a guideline jointly released by the Ministry of Civil Affairs and other related departments.</p>`,r:{minutes:.98,words:293},y:"a",t:"10.28  特殊困难老年人探访关爱服务 home visit and care services for the elderly with special difficulties"}}],["/english/china/10.29.html",{loader:()=>A(()=>import("./10.29.html-D20E0BgE.js"),__vite__mapDeps([44,1])),meta:{d:1707969149e3,e:`
<p>十三届全国人大常委会第三十七次会议10月30日表决通过了新修订的畜牧法，将于2023年3月1日起施行。</p>
<p>China's National People's Congress Standing Committee on Sunday passed the newly revised Animal Husbandry Law. The revised law will come into force on March 1, 2023.</p>
<p>come into force —— 实施</p>
<p>【重要讲话】</p>
<p>我们要坚持走中国特色社会主义法治道路，建设中国特色社会主义法治体系、建设社会主义法治国家，围绕保障和促进社会公平正义，坚持依法治国、依法执政、依法行政共同推进，坚持法治国家、法治政府、法治社会一体建设，全面推进科学立法、严格执法、公正司法、全民守法，全面推进国家各方面工作法治化。</p>`,r:{minutes:1.81,words:542},y:"a",t:"10.29 新修订的畜牧法 the newly revised Animal Husbandry Law"}}],["/english/china/10.30.html",{loader:()=>A(()=>import("./10.30.html-Dh3oMCmI.js"),__vite__mapDeps([45,1])),meta:{d:1707969149e3,e:`
<p>module  n.单元；模块；功能块；程序块；舱</p>
<p>10月31日15时37分，搭载空间站梦天实验舱的长征五号B遥四运载火箭，在我国文昌航天发射场准时点火发射，约8分钟后，梦天实验舱与火箭成功分离并准确进入预定轨道——距离地球约400千米的近地轨道。发射任务取得圆满成功。</p>
<p>China's Mengtian space lab module was launched on Monday afternoon. The lab module's carrier — a Long March 5B heavy-lift rocket — blasted off at 3:37 pm at the Wenchang Space Launch Center in the southernmost island province of Hainan. After flying more than eight minutes, the rocket placed the spacecraft into a low-Earth orbit nearly 400 kilometers above the ground.</p>`,r:{minutes:2.33,words:699},y:"a",t:"10.30 梦天实验舱 Mengtian space lab module"}}],["/english/china/10.31.html",{loader:()=>A(()=>import("./10.31.html-CpEUqhER.js"),__vite__mapDeps([46,1])),meta:{d:1707969149e3,e:`
<p>十三届全国人大常委会第三十七次会议 10 月 30 日表决通过黄河保护法。这部法律将从 2023 年 4 月 1 日起施行。</p>
<p>Chinese lawmakers voted on October 30 to adopt a law on the conservation of the Yellow River. The law, passed at the 37th standing committee session of the 13th National People's Congress (NPC), will take effect on April 1, 2023.</p>`,r:{minutes:.91,words:272},y:"a",t:"10.31 黄河保护法 law on Yellow River conservation"}}],["/english/china/11.1.html",{loader:()=>A(()=>import("./11.1.html-PurNzN0e.js"),__vite__mapDeps([47,1])),meta:{d:1707969149e3,e:`
<p>2022年世界城市日全球主场活动暨第二届城市可持续发展全球大会日前在上海开幕。本届世界城市日主题为“行动，从地方走向全球”，由住房和城乡建设部、上海市人民政府、联合国人居署共同举办。</p>
<p>Themed "Act Local to Go Global", the Global Observance of World Cities Day 2022 and the Second Sustainable Development Goals Cities Global Conference were co-hosted by the Ministry of Housing and Urban-Rural Development, the Shanghai municipal government and the United Nations Human Settlements Programme, with an opening ceremony held in Shanghai on Oct 31.</p>`,r:{minutes:1.41,words:422},y:"a",t:"11.1 世界城市日全球主场活动 Global Observance of World Cities Day"}}],["/english/china/11.2.html",{loader:()=>A(()=>import("./11.2.html-BIvjPBNO.js"),__vite__mapDeps([48,1])),meta:{d:1707969149e3,e:`
<p>10 月 31 日，中共中央总书记、国家主席习近平在北京人民大会堂向越共中央总书记阮富仲授予中华人民共和国“友谊勋章”，并举行隆重颁授仪式。</p>
<p>Xi Jinping, general secretary of the Communist Party of China (CPC) Central Committee and Chinese president, awarded Nguyen Phu Trong, general secretary of the Communist Party of Vietnam (CPV) Central Committee, the Friendship Medal of the People's Republic of China during a ceremony held at the Great Hall of the People in Beijing on Oct. 31.</p>`,r:{minutes:1.12,words:337},y:"a",t:"11.2 中华人民共和国“友谊勋章”the Friendship Medal of the People's Republic of China"}}],["/english/free/1.html",{loader:()=>A(()=>import("./1.html-DxPLEmbL.js"),__vite__mapDeps([49,1])),meta:{d:1707969149e3,e:`
<p>source：<a href="https://time.com/charter/6216047/prepared-leader-erika-james-lynn-wooten/" target="_blank" rel="noopener noreferrer">The 5 Phases of Leading Through a Crisis</a></p>
<p>课程链接：<a href="https://www.bilibili.com/video/BV13B4y1E7cV/?spm_id_from=333.337.search-card.all.click&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">FREE 大学英语阅读写作能力提升第一次课</a></p>`,r:{minutes:3.82,words:1145},y:"a",t:"1First：The 5 Phases of Leading Through a Crisis"}}],["/english/free/2.html",{loader:()=>A(()=>import("./2.html-BEjiS0fQ.js"),__vite__mapDeps([50,1])),meta:{d:1707969149e3,e:`
<p>Issue: On Leadership</p>
<p>写作：</p>
<p>1	模板式写作 — 最初级写作方式</p>
<p>2	参考式写作 — 基于大量语料的重新组合（改删编）</p>
<p>3	原创式写作 — 高级写作方式</p>
<p>个人写作思路 + 现有写作素材</p>
<p><em><strong>写作主题</strong></em>：领导力</p>
<div class="hint-container tip">
<p class="hint-container-title">写作内容：</p>
<p>1、我们为什么需要领导力？背景</p>
<p>2、什么是领导力？总括</p>
<p>3、领导力具体有哪些体现？具体细节</p>
<p>4、我们应该如何提高领导力？建议</p>
<p>5、提高领导力会带来什么结果？作用</p>
</div>`,r:{minutes:2.32,words:697},y:"a",t:"2Second【写作】：The 5 Phases of Leading Through a Crisis"}}],["/english/free/3.html",{loader:()=>A(()=>import("./3.html-DmTilcTr.js"),__vite__mapDeps([51,1])),meta:{d:1707969149e3,e:`
<p>1	three pillars of a Good Job  好工作的三个重要因素</p>
<p>2	stagnating  负态度 stagnate  停滞</p>
<p>3	read and heed (think) 读 + 思考  尾韵</p>
<p>read and share</p>
<p>read and write</p>
<p>4</p>
<div class="hint-container tip">
<p class="hint-container-title">Good jobs are essential to :</p>
<p>a healthy economy</p>
<p>successful business</p>
<p>strong communities</p>
<p>thriving families</p>
<p>a well-functioning society</p>
</div>`,r:{minutes:1.2,words:361},y:"a",t:"3Third：The 3 Pillars of a Good Job"}}],["/english/free/4.html",{loader:()=>A(()=>import("./4.html-BpeD0fmu.js"),__vite__mapDeps([52,1])),meta:{d:1707969149e3,e:`
<p>1	reckoning	认知  idea / belief / thought / opinion</p>
<p>2	define ourselves less by what we do for a living</p>
<div class="hint-container warning">
<p class="hint-container-title">写作句式</p>
<p>define sth less by … more by …</p>
<p>不要通过……定义，而要通过……定义</p>
<p>e.g.  We should define food less by price, more by flavour.</p>
</div>`,r:{minutes:1.57,words:470},y:"a",t:"4Forth：The 3 Pillars of a Good Job"}}],["/english/free/5.html",{loader:()=>A(()=>import("./5.html-DqiGluy4.js"),__vite__mapDeps([53,1])),meta:{d:1707969149e3,e:`
<p>1	literally	字面意义上的，确实如此（表强调）</p>
<p>2	shelter – in – place 居家</p>
<p>3	a fleeting declines  少 – inescapable 多 负态度</p>
<p>表示某个东西到处都是，且是负态度，可以用 inescapable</p>
<p>fleet  n 舰队 v 快速</p>
<p>4	nuisance 令人讨厌的人或事物</p>
<p>5	let sth slip away  让某物溜走 = lose sth（是眼睁睁看着溜走的，有挽回机会但是不珍惜）</p>
<p>let the time slip away = waste time</p>`,r:{minutes:1.45,words:434},y:"a",t:"5Fifth：How Listening to Silence Changes Our Brains"}}],["/english/free/6.html",{loader:()=>A(()=>import("./6.html-DeIHw4fQ.js"),__vite__mapDeps([54,1])),meta:{d:1707969149e3,e:`
<p>Issue：如何写负态度bad / worse / worst ?</p>
<p>1	be behind 落后了</p>
<p>2	falter  v 变差，变坏，衰退 = worsen</p>
<p>e.g.	My math education falter.  数学成绩变差了</p>
<p><strong>sth falter 某事变差，某事做主语</strong></p>
<p>3	a rocky transition  不稳定的，不牢固的转变</p>
<p>4	remote learning  远程学习，线上学习</p>
<p>5	flounder		v不知所措 迷茫</p>
`,r:{minutes:3.03,words:908},y:"a",t:"6Sixth：The Pandemic Generation Goes to College"}}],["/english/free/7.html",{loader:()=>A(()=>import("./7.html-CmqJiUAG.js"),__vite__mapDeps([55,1])),meta:{d:1707969149e3,e:`
<div class="hint-container warning">
<p class="hint-container-title">1 提问——做出假设 写作句型</p>
<p>Could the next Leo Tolstoy or Jane Austen be a well-engineered AI software programme? It’s a question that is becoming increasingly pressing as machine language-learning software continues to evolve.</p>
<p>问题开场——结合主题做出假设——可能性</p>
<p>e.g. <em>It’s a question that is becoming increasingly pressing</em> <u><strong>as</strong></u> machine language-learning software continues to evolve. 现在的真实情况</p>
</div>`,r:{minutes:1.44,words:432},y:"a",t:"7Seventh：When Algorithms Lend Authors A Helping Hand"}}],["/english/free/8.html",{loader:()=>A(()=>import("./8.html-fVRW4tQn.js"),__vite__mapDeps([56,1])),meta:{d:1707969149e3,e:`
<p>1	the knockout (K.O.) stages 	淘汰赛</p>
<p>2	win - win the trophy 	取得胜利</p>
<p>3	four games in the knockout rounds were <strong>tied</strong> 平局</p>
<p>4	convert	转化 用在次数/概率中</p>
<p>5	stay stationary 	保持静止，一动不动（立场、坚持）</p>
<p>6	has a <strong>flaw</strong> in sth  在某方面有缺陷</p>
<p>7	rival	对手、竞争对手；势均力敌的两个人</p>`,r:{minutes:.83,words:250},y:"a",t:"8Eighth：How to emerge a hero from the tension of a World Cup penalty shootout"}}],["/english/free/9.html",{loader:()=>A(()=>import("./9.html-D4XVvXST.js"),__vite__mapDeps([57,1])),meta:{d:1707969149e3,e:`
<p>01	I <text style="color:red;">commissioned</text> a haiku  委托他人撰写</p>
<p>02	a double wordplay 双关</p>
<p>03	a dodgy 差劲的 metre and stolid 呆板的 rhymes</p>
<p>04	the <text style="color:red;">ersatz</text> 人造的，低一个档次的 creativity</p>
<p>05	sth <text style="color:red;">creaked</text> under the strain of demands from sb. 某物在某人的要求压力下不堪重负</p>`,r:{minutes:1.16,words:348},y:"a",t:"9Ninth：ChatGPT is fluent, clever and dangerously creative"}}],["/english/video/1.html",{loader:()=>A(()=>import("./1.html-dPdaXMqi.js"),__vite__mapDeps([58,1])),meta:{d:1707969149e3,e:`
<p>video：<a href="https://www.bilibili.com/video/BV1rZ4y187ZE?p=1&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">博士霉 Taylor Swift 在纽约大学 2022 届毕业典礼完整演讲</a></p>
<p>(Why not watch both raw video and biolanguage-video twice?)</p>
<h2>Words</h2>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">philanthropist <text style="color:grey;">[fɪˈlænθrəpɪst]</text></td>
<td style="text-align:center">n.慈善家</td>
</tr>
<tr>
<td style="text-align:center">bring joy and resolve to sb.</td>
<td style="text-align:center">为某人/某些人群带去快乐和信念</td>
</tr>
<tr>
<td style="text-align:center">genres <text style="color:grey;">[ˈ(d)ʒɑːŋrəz]</text></td>
<td style="text-align:center">n.（音乐，文章）体裁</td>
</tr>
<tr>
<td style="text-align:center">genders</td>
<td style="text-align:center">n.性别</td>
</tr>
<tr>
<td style="text-align:center">demographic</td>
<td style="text-align:center">n.人口 adj.人口学的</td>
</tr>
<tr>
<td style="text-align:center">original studio albums</td>
<td style="text-align:center">原始录音室专辑</td>
</tr>
<tr>
<td style="text-align:center">extended plays（EP）</td>
<td style="text-align:center">迷你专辑</td>
</tr>
<tr>
<td style="text-align:center">live album</td>
<td style="text-align:center">现场专辑</td>
</tr>
<tr>
<td style="text-align:center">compilation</td>
<td style="text-align:center">n.选辑，编著</td>
</tr>
<tr>
<td style="text-align:center">galvanize</td>
<td style="text-align:center">v.刺激，激励</td>
</tr>
<tr>
<td style="text-align:center">discrimination</td>
<td style="text-align:center">n.歧视</td>
</tr>
<tr>
<td style="text-align:center">sexual orientation</td>
<td style="text-align:center">性取向</td>
</tr>
<tr>
<td style="text-align:center">gender identity</td>
<td style="text-align:center">性别认同</td>
</tr>
<tr>
<td style="text-align:center">prevent discrimination on the basis of <text style="color:green;">sexual orientation</text> and <text style="color:green;">gender identity</text></td>
<td style="text-align:center">遏制基于性取向与性别认同的歧视</td>
</tr>
<tr>
<td style="text-align:center">initiative</td>
<td style="text-align:center">n.倡议</td>
</tr>
<tr>
<td style="text-align:center">harassment</td>
<td style="text-align:center">n.骚扰</td>
</tr>
<tr>
<td style="text-align:center">assault</td>
<td style="text-align:center">n.攻击，侵犯人身</td>
</tr>
<tr>
<td style="text-align:center">sexual <text style="color:green;">assault</text></td>
<td style="text-align:center">性侵害</td>
</tr>
<tr>
<td style="text-align:center">support initiatives to protect women and girls from <text style="color:green;">harassment</text> and <text style="color:green;">sexual assault</text></td>
<td style="text-align:center">支持保护妇女和女孩免受性侵害和骚扰的倡议</td>
</tr>
<tr>
<td style="text-align:center">tornadoes</td>
<td style="text-align:center">n.龙卷风</td>
</tr>
<tr>
<td style="text-align:center">cancer research</td>
<td style="text-align:center">癌症研究</td>
</tr>
<tr>
<td style="text-align:center">literacy</td>
<td style="text-align:center">n.读写能力</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">literacy</text> program for children</td>
<td style="text-align:center">儿童扫盲计划</td>
</tr>
<tr>
<td style="text-align:center">exploitation</td>
<td style="text-align:center">n.剥削，开发</td>
</tr>
<tr>
<td style="text-align:center">champion</td>
<td style="text-align:center">n.冠军，第一名    v.捍卫，为……而争斗</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">champion</text> right</td>
<td style="text-align:center">捍卫权利</td>
</tr>
<tr>
<td style="text-align:center">compensate</td>
<td style="text-align:center">v.补偿，弥补</td>
</tr>
<tr>
<td style="text-align:center">eloquently</td>
<td style="text-align:center">v.有力地，雄辩地</td>
</tr>
<tr>
<td style="text-align:center">speak out forcefully, <text style="color:green;">eloquently</text> and effectively</td>
<td style="text-align:center">坚定地，有力地，有效地发声</td>
</tr>
<tr>
<td style="text-align:center">virtue</td>
<td style="text-align:center">n.高尚的道德，正直的品行</td>
</tr>
<tr>
<td style="text-align:center">vest</td>
<td style="text-align:center">v.给予，授予某人某种权利</td>
</tr>
<tr>
<td style="text-align:center">by virtue of the authority vested in me</td>
<td style="text-align:center">我仅代表赋予我的权利</td>
</tr>
<tr>
<td style="text-align:center">confer</td>
<td style="text-align:center">v.商讨，协商；授予（荣誉，学术学位）</td>
</tr>
<tr>
<td style="text-align:center">glittery</td>
<td style="text-align:center">adj.亮闪闪的</td>
</tr>
<tr>
<td style="text-align:center">heels</td>
<td style="text-align:center">n.高跟鞋</td>
</tr>
<tr>
<td style="text-align:center">humble</td>
<td style="text-align:center">adj.谦虚的，v.使感到卑微</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">humble</text> me with their works</td>
<td style="text-align:center">他们的工作使我甘拜下风</td>
</tr>
<tr>
<td style="text-align:center">elated</td>
<td style="text-align:center">adj.高兴的，欢欣鼓舞的</td>
</tr>
<tr>
<td style="text-align:center">patchwork</td>
<td style="text-align:center">n.拼凑的东西</td>
</tr>
<tr>
<td style="text-align:center">incredible</td>
<td style="text-align:center">adj.不可思议的，极好的，不可置信的</td>
</tr>
<tr>
<td style="text-align:center">ally</td>
<td style="text-align:center">n.盟友</td>
</tr>
<tr>
<td style="text-align:center">mentor</td>
<td style="text-align:center">n.导师</td>
</tr>
<tr>
<td style="text-align:center">the persuit of educational enrichment</td>
<td style="text-align:center">追求丰富多样的教育</td>
</tr>
<tr>
<td style="text-align:center">cathy</td>
<td style="text-align:center">adj.悦耳易记的</td>
</tr>
<tr>
<td style="text-align:center">cathartic</td>
<td style="text-align:center">adj.起宣泄作用的</td>
</tr>
<tr>
<td style="text-align:center">hook</td>
<td style="text-align:center">n.钩，也指音乐中最吸引的人的部分</td>
</tr>
<tr>
<td style="text-align:center">song with a <text style="color:green;">cathy hook</text> and an intensly <text style="color:green;">cathartic</text> bridge section</td>
<td style="text-align:center">一首有朗朗上口的副歌和一个强烈桥段的歌曲</td>
</tr>
<tr>
<td style="text-align:center">breed</td>
<td style="text-align:center">n.品种</td>
</tr>
<tr>
<td style="text-align:center">terminals</td>
<td style="text-align:center">n.航空站，（火车，公共汽车或船的）终点站</td>
</tr>
<tr>
<td style="text-align:center">glamorous</td>
<td style="text-align:center">adj.十分迷人的</td>
</tr>
<tr>
<td style="text-align:center">essentially</td>
<td style="text-align:center">adv.根本地，基本地，本质上</td>
</tr>
<tr>
<td style="text-align:center">unsolicited</td>
<td style="text-align:center">adj.未被要求的，自发的</td>
</tr>
<tr>
<td style="text-align:center">solicit</td>
<td style="text-align:center">vt.恳求，征求；索求，请求……给予</td>
</tr>
<tr>
<td style="text-align:center">impart</td>
<td style="text-align:center">vt.传授，给予，透露</td>
</tr>
<tr>
<td style="text-align:center">grudge</td>
<td style="text-align:center">n.积怨，怨恨 v.勉强做</td>
</tr>
<tr>
<td style="text-align:center">toxic</td>
<td style="text-align:center">adj.有毒的</td>
</tr>
<tr>
<td style="text-align:center">outweigh</td>
<td style="text-align:center">adv.胜过，超过</td>
</tr>
<tr>
<td style="text-align:center">discerning</td>
<td style="text-align:center">adj.敏锐的，有识别力的，有洞察力的</td>
</tr>
<tr>
<td style="text-align:center">cringe</td>
<td style="text-align:center">n.尴尬，难为情；v.畏缩，退却</td>
</tr>
<tr>
<td style="text-align:center">retrospectively</td>
<td style="text-align:center">adv.回溯性地，回顾地</td>
</tr>
<tr>
<td style="text-align:center">deem</td>
<td style="text-align:center">v.认为，视为，相信</td>
</tr>
<tr>
<td style="text-align:center">be <text style="color:green;">deemed</text> as</td>
<td style="text-align:center">被视为=be treated as = be viewed as</td>
</tr>
<tr>
<td style="text-align:center">revolting</td>
<td style="text-align:center">adj.令人作呕的，令人讨厌的</td>
</tr>
<tr>
<td style="text-align:center">hilarious</td>
<td style="text-align:center">adj.令人捧腹的，极其滑稽的</td>
</tr>
<tr>
<td style="text-align:center">phase</td>
<td style="text-align:center">n.阶段，时期 <text style="color:grey;">注：霉霉在演讲时，提到“时期”这个词几乎不用 period，而是用 phase</text></td>
</tr>
<tr>
<td style="text-align:center">squirm</td>
<td style="text-align:center">v.无地自容，十分尴尬</td>
</tr>
<tr>
<td style="text-align:center">stigma</td>
<td style="text-align:center">n.耻辱，羞耻</td>
</tr>
<tr>
<td style="text-align:center">unbothered</td>
<td style="text-align:center">adj.不相关的</td>
</tr>
<tr>
<td style="text-align:center">ambivalence</td>
<td style="text-align:center">n.矛盾心理</td>
</tr>
<tr>
<td style="text-align:center">perpetuate</td>
<td style="text-align:center">v.使延续</td>
</tr>
<tr>
<td style="text-align:center">chic</td>
<td style="text-align:center">adj.时髦的，别致的，优雅的</td>
</tr>
<tr>
<td style="text-align:center">direct videos</td>
<td style="text-align:center">导演视频</td>
</tr>
<tr>
<td style="text-align:center">create the visuals for a tour</td>
<td style="text-align:center">为巡演做视觉效果</td>
</tr>
<tr>
<td style="text-align:center">ensnare</td>
<td style="text-align:center">v.使陷入陷阱、困境</td>
</tr>
<tr>
<td style="text-align:center">sth  <text style="color:green;">ensnares</text> sb.</td>
<td style="text-align:center">某物使某人陷入困境</td>
</tr>
<tr>
<td style="text-align:center">senior thesis</td>
<td style="text-align:center">n.毕业论文</td>
</tr>
<tr>
<td style="text-align:center">chameleons</td>
<td style="text-align:center">n.变色龙</td>
</tr>
<tr>
<td style="text-align:center">veiled</td>
<td style="text-align:center">adj.含蓄的，掩饰的</td>
</tr>
<tr>
<td style="text-align:center">obsess</td>
<td style="text-align:center">v.迷恋，使痴迷</td>
</tr>
<tr>
<td style="text-align:center">our society/world are absolutely <text style="color:green;">obsessed</text> with the idea that……</td>
<td style="text-align:center">我们的世界/社会极其推崇的一个观念是……</td>
</tr>
<tr>
<td style="text-align:center">slight</td>
<td style="text-align:center">adj.轻微的，略微的；v.冷落，轻视</td>
</tr>
<tr>
<td style="text-align:center">barb</td>
<td style="text-align:center">n.挖苦，中伤人的话</td>
</tr>
<tr>
<td style="text-align:center">run off the rails</td>
<td style="text-align:center">跑偏，发展不再完美</td>
</tr>
<tr>
<td style="text-align:center">slip up</td>
<td style="text-align:center">出小差错</td>
</tr>
<tr>
<td style="text-align:center">axis</td>
<td style="text-align:center">n.轴</td>
</tr>
<tr>
<td style="text-align:center">get back up</td>
<td style="text-align:center">跌倒了就站起来</td>
</tr>
<tr>
<td style="text-align:center">dust yourself off</td>
<td style="text-align:center">拂去身上的灰尘</td>
</tr>
<tr>
<td style="text-align:center">hang out with you</td>
<td style="text-align:center">和你在一起</td>
</tr>
<tr>
<td style="text-align:center">make the cut</td>
<td style="text-align:center">取得资格</td>
</tr>
<tr>
<td style="text-align:center">crucial</td>
<td style="text-align:center">adj.重要的，至关重要的</td>
</tr>
<tr>
<td style="text-align:center">roster</td>
<td style="text-align:center">n.名册，名单</td>
</tr>
<tr>
<td style="text-align:center">perceive</td>
<td style="text-align:center">v.感知，认为，察觉到，注意到</td>
</tr>
<tr>
<td style="text-align:center">weird</td>
<td style="text-align:center">adj.奇怪的</td>
</tr>
<tr>
<td style="text-align:center">simulation</td>
<td style="text-align:center">n.模拟，仿真</td>
</tr>
<tr>
<td style="text-align:center">excruciatingly</td>
<td style="text-align:center">adv.极痛苦地，极度地</td>
</tr>
<tr>
<td style="text-align:center">devalue</td>
<td style="text-align:center">v.贬值，降低</td>
</tr>
<tr>
<td style="text-align:center">fluctuating</td>
<td style="text-align:center">adj.波动起伏的</td>
</tr>
<tr>
<td style="text-align:center">relevance</td>
<td style="text-align:center">n.关联的，相关性的，交往</td>
</tr>
<tr>
<td style="text-align:center">consummate</td>
<td style="text-align:center">adj.技艺高超的，完美的</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">consummate</text> optimist</td>
<td style="text-align:center">完美主义者</td>
</tr>
<tr>
<td style="text-align:center">misspeak</td>
<td style="text-align:center">v.说错话</td>
</tr>
<tr>
<td style="text-align:center">underreact</td>
<td style="text-align:center">v.反应太慢</td>
</tr>
<tr>
<td style="text-align:center">overreact</td>
<td style="text-align:center">v.过度反应</td>
</tr>
<tr>
<td style="text-align:center">self sabotage</td>
<td style="text-align:center">自暴自弃</td>
</tr>
<tr>
<td style="text-align:center">hit rock bottom</td>
<td style="text-align:center">跌到谷底</td>
</tr>
<tr>
<td style="text-align:center">not take the steps to make it right</td>
<td style="text-align:center">不思悔改</td>
</tr>
<tr>
<td style="text-align:center">rinse</td>
<td style="text-align:center">v.漂洗，清洗</td>
</tr>
<tr>
<td style="text-align:center">leave the structure and framework of school</td>
<td style="text-align:center">离开学校的条条框框</td>
</tr>
<tr>
<td style="text-align:center">let go with grace</td>
<td style="text-align:center">优雅地放手</td>
</tr>
<tr>
<td style="text-align:center">gut</td>
<td style="text-align:center">adj.本能的</td>
</tr>
<tr>
<td style="text-align:center">instinct</td>
<td style="text-align:center">n.本能，直觉</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">gut instinct</text></td>
<td style="text-align:center">直觉</td>
</tr>
<tr>
<td style="text-align:center">intuition</td>
<td style="text-align:center">n.直觉</td>
</tr>
<tr>
<td style="text-align:center">screw up</td>
<td style="text-align:center">搞砸一切</td>
</tr>
<tr>
<td style="text-align:center">resilient</td>
<td style="text-align:center">adj.有适应力的，有韧性的</td>
</tr>
</tbody>
</table>`,r:{minutes:8.12,words:2437},y:"a",t:"01. Doctor Degree Graduation Speech of Taylor Swift"}}],["/english/video/2.html",{loader:()=>A(()=>import("./2.html-pLiJe7hL.js"),__vite__mapDeps([59,1])),meta:{d:1707969149e3,e:`
<p>video：<a href="https://www.bilibili.com/video/BV1L94y1X76Q?spm_id_from=333.999.0.0&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">原神 - 辉金盛夏 - 过场 pv-中英双语</a></p>
<h2>Words</h2>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">murmur</td>
<td style="text-align:center">v.嘟囔，喃喃细语</td>
</tr>
<tr>
<td style="text-align:center">enlighten</td>
<td style="text-align:center">v.启发，开导，阐明</td>
</tr>
<tr>
<td style="text-align:center">enlightened</td>
<td style="text-align:center">adj.开明的，有见识的</td>
</tr>
<tr>
<td style="text-align:center">hatred</td>
<td style="text-align:center">n.仇恨，憎恨，厌恶</td>
</tr>
<tr>
<td style="text-align:center">embark</td>
<td style="text-align:center">v.上船</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">embark</text> on a journey</td>
<td style="text-align:center">踏上旅途</td>
</tr>
<tr>
<td style="text-align:center">erect</td>
<td style="text-align:center">v.建起，竖起，搭起；adj.垂直的，竖直的</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">erect</text> castles and towns</td>
<td style="text-align:center">搭建城堡与乡镇</td>
</tr>
<tr>
<td style="text-align:center">magnificent</td>
<td style="text-align:center">adj.壮丽的，宏伟的</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">magnificent</text> kingdom</td>
<td style="text-align:center">金碧辉煌的王国</td>
</tr>
<tr>
<td style="text-align:center">crystal</td>
<td style="text-align:center">n.结晶，水晶 adj.水晶般的，晶莹的</td>
</tr>
<tr>
<td style="text-align:center">mortal</td>
<td style="text-align:center">n.凡人，人，普通人  adj.致命的，不共戴天的</td>
</tr>
<tr>
<td style="text-align:center">let alone</td>
<td style="text-align:center">更不用说，更别提</td>
</tr>
<tr>
<td style="text-align:center">flap</td>
<td style="text-align:center">v.拍打，振翅</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">flap</text> wings</td>
<td style="text-align:center">（鸟儿）拍打翅膀</td>
</tr>
<tr>
<td style="text-align:center">dazzling</td>
<td style="text-align:center">adj.耀眼的，夺目的，灿烂的</td>
</tr>
<tr>
<td style="text-align:center">illuminate</td>
<td style="text-align:center">v.照亮，照明；阐明，解释</td>
</tr>
<tr>
<td style="text-align:center">voice a complain</td>
<td style="text-align:center">抱怨</td>
</tr>
</tbody>
</table>`,r:{minutes:1.75,words:525},y:"a",t:"02. [Genshin Impact] Golden Midsummer"}}],["/english/video/3.html",{loader:()=>A(()=>import("./3.html-CeERrHf9.js"),__vite__mapDeps([60,1])),meta:{d:1707969149e3,e:`
<p>video：<a href="https://www.bilibili.com/video/BV1XJ411C78R?spm_id_from=333.337.search-card.all.click&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer"><strong>Taylor Swift</strong> Accepts Woman of the Decade Award | Women In Music</a></p>
<h2>Words</h2>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">This is going great so far</td>
<td style="text-align:center">这一切真是顺利极了</td>
</tr>
<tr>
<td style="text-align:center">put out</td>
<td style="text-align:center">出版</td>
</tr>
<tr>
<td style="text-align:center">debut</td>
<td style="text-align:center">v.首次亮相，首次出演</td>
</tr>
<tr>
<td style="text-align:center">self-titled</td>
<td style="text-align:center">同名</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">self-titled debut </text>album</td>
<td style="text-align:center">首张同名专辑</td>
</tr>
<tr>
<td style="text-align:center">breakthrough</td>
<td style="text-align:center">n.重大进展，突破</td>
</tr>
<tr>
<td style="text-align:center">reservation</td>
<td style="text-align:center">n.预约，预订；<text style="color:red;">迷惑</text></td>
</tr>
<tr>
<td style="text-align:center">savvy</td>
<td style="text-align:center">adj.有见识的；通情达理的</td>
</tr>
<tr>
<td style="text-align:center">record label</td>
<td style="text-align:center">唱片公司</td>
</tr>
<tr>
<td style="text-align:center">detractor</td>
<td style="text-align:center">n.诋毁者，贬低者</td>
</tr>
<tr>
<td style="text-align:center">satire</td>
<td style="text-align:center">n.讽刺，讽刺作品</td>
</tr>
<tr>
<td style="text-align:center">anthem</td>
<td style="text-align:center">n.国歌，（组织或群体的）社歌</td>
</tr>
<tr>
<td style="text-align:center">lyrical</td>
<td style="text-align:center">adj.抒情的</td>
</tr>
<tr>
<td style="text-align:center">dictate</td>
<td style="text-align:center">v.命令；口述</td>
</tr>
<tr>
<td style="text-align:center">backlash</td>
<td style="text-align:center">n.强烈抵制，集体反对</td>
</tr>
<tr>
<td style="text-align:center">pitchy</td>
<td style="text-align:center">adj.沥青似的，粘性的</td>
</tr>
<tr>
<td style="text-align:center">harsh</td>
<td style="text-align:center">adj.严厉的，严苛的；恶劣的；残酷的</td>
</tr>
<tr>
<td style="text-align:center">this wave of <text style="color:green;">harsh</text> criticism had hit me so hard</td>
<td style="text-align:center">这样严苛残酷的批评浪潮非常打击我<br>1.wave of……  要说“……的浪潮”的时候用“wave”一词<br>2.hit 可以表示“击打”，不只物理的，还能像这句一样用<br>3.掌握“harsh”的用法</td>
</tr>
<tr>
<td style="text-align:center">clever</td>
<td style="text-align:center">adj.聪明的，<text style="color:red;">油腔滑调的</text></td>
</tr>
<tr>
<td style="text-align:center">vocal</td>
<td style="text-align:center">adj.噪音的；直言不讳的；n.（乐曲中的）歌唱部分</td>
</tr>
<tr>
<td style="text-align:center">stamina</td>
<td style="text-align:center">n.耐力，持久力</td>
</tr>
<tr>
<td style="text-align:center">appease</td>
<td style="text-align:center">v.抚慰，安抚</td>
</tr>
<tr>
<td style="text-align:center">manipulator</td>
<td style="text-align:center">n.操纵者</td>
</tr>
<tr>
<td style="text-align:center">calculated <text style="color:green;">manipulator</text></td>
<td style="text-align:center">精打细算的控制狂</td>
</tr>
<tr>
<td style="text-align:center">public view</td>
<td style="text-align:center">公众视野</td>
</tr>
<tr>
<td style="text-align:center">reserve</td>
<td style="text-align:center">v.拥有，保留</td>
</tr>
<tr>
<td style="text-align:center">scrutiny</td>
<td style="text-align:center">n.仔细检查，认真仔细的审查</td>
</tr>
<tr>
<td style="text-align:center">ruthlessly</td>
<td style="text-align:center">adv.无情地，残忍地</td>
</tr>
<tr>
<td style="text-align:center">aesthetic<text style="color:grey;">[iːsˈθetɪk]</text></td>
<td style="text-align:center">n.美学；美感；审美观</td>
</tr>
<tr>
<td style="text-align:center">repurpose</td>
<td style="text-align:center">v.（为适合新用途）对……稍加修改</td>
</tr>
<tr>
<td style="text-align:center">nominate</td>
<td style="text-align:center">v.提名；推荐；任命</td>
</tr>
<tr>
<td style="text-align:center">motion</td>
<td style="text-align:center">n.移动，运动</td>
</tr>
<tr>
<td style="text-align:center">crush</td>
<td style="text-align:center">v.压坏，压伤</td>
</tr>
<tr>
<td style="text-align:center">pressure may <text style="color:green;">crush</text> sb.</td>
<td style="text-align:center">压力可能会压垮某人</td>
</tr>
<tr>
<td style="text-align:center">mixing board</td>
<td style="text-align:center">n.混音台</td>
</tr>
<tr>
<td style="text-align:center">frontier</td>
<td style="text-align:center">n.边界，边境，国界</td>
</tr>
<tr>
<td style="text-align:center">the streaming world</td>
<td style="text-align:center">流媒体世界</td>
</tr>
<tr>
<td style="text-align:center">drop a song</td>
<td style="text-align:center">发布歌曲</td>
</tr>
<tr>
<td style="text-align:center">revenue</td>
<td style="text-align:center">n.收入，财政收入</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">revenue</text> flow</td>
<td style="text-align:center">财政收入流</td>
</tr>
<tr>
<td style="text-align:center">unregulated</td>
<td style="text-align:center">adj.不受约束的，不受监管的</td>
</tr>
<tr>
<td style="text-align:center">estate</td>
<td style="text-align:center">n.庄园，个人财产</td>
</tr>
<tr>
<td style="text-align:center">prior</td>
<td style="text-align:center">adj.先前的；优先的；较重要的</td>
</tr>
<tr>
<td style="text-align:center">misconduct</td>
<td style="text-align:center">n.不当行为</td>
</tr>
<tr>
<td style="text-align:center">call out unfairness and <text style="color:green;">misconduct</text></td>
<td style="text-align:center">指出不公平与不当行为</td>
</tr>
<tr>
<td style="text-align:center">advent</td>
<td style="text-align:center">n.到来，（重要事件，人物，发明）的出现</td>
</tr>
<tr>
<td style="text-align:center">the <text style="color:green;">advent</text> of social media</td>
<td style="text-align:center">社交媒体的面世</td>
</tr>
<tr>
<td style="text-align:center">contractual</td>
<td style="text-align:center">adj.合同的</td>
</tr>
<tr>
<td style="text-align:center">unrecoupable</td>
<td style="text-align:center">adj.不可挽回的</td>
</tr>
</tbody>
</table>`,r:{minutes:4.31,words:1293},y:"a",t:"03.Taylor Swift Accepts Woman of the Decade Award"}}],["/english/video/4.html",{loader:()=>A(()=>import("./4.html-CEDRZje5.js"),__vite__mapDeps([61,1])),meta:{d:1707969149e3,e:`
<p>video:<a href="https://www.bilibili.com/video/BV1fR4y1s7ij?spm_id_from=333.999.0.0&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">[新华社]南京大屠杀唯一动态影像</a></p>
<h2>Words</h2>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">massacre <text style="color:grey;">[ˈmæsəkə(r)]</text></td>
<td style="text-align:center">n.大屠杀，屠杀</td>
</tr>
<tr>
<td style="text-align:center">atrocity</td>
<td style="text-align:center">n.战争中的暴行</td>
</tr>
<tr>
<td style="text-align:center">the most direct and powerful evidence</td>
<td style="text-align:center">最直接有力的证据</td>
</tr>
<tr>
<td style="text-align:center">Japanese invasion</td>
<td style="text-align:center">日本侵华</td>
</tr>
<tr>
<td style="text-align:center">horrifying</td>
<td style="text-align:center">adj.极其震惊的（horrify 的现在分词）</td>
</tr>
<tr>
<td style="text-align:center">torture</td>
<td style="text-align:center">v.&amp;n.拷打，酷刑，折磨</td>
</tr>
<tr>
<td style="text-align:center">receive medical treatment</td>
<td style="text-align:center">接受医院治疗</td>
</tr>
<tr>
<td style="text-align:center">the only motion picture images of the Nanjing Massacre</td>
<td style="text-align:center">有关南京大屠杀的唯一动态画面</td>
</tr>
<tr>
<td style="text-align:center">brutally</td>
<td style="text-align:center">adv.残忍地，野蛮地</td>
</tr>
<tr>
<td style="text-align:center">smuggle</td>
<td style="text-align:center">v.走私，偷运</td>
</tr>
<tr>
<td style="text-align:center">tribunal</td>
<td style="text-align:center">n.法庭，特别法庭</td>
</tr>
<tr>
<td style="text-align:center">Nanjing War Crimes <text style="color:green;">Tribunal</text></td>
<td style="text-align:center">南京国防部审判战犯军事法庭</td>
</tr>
<tr>
<td style="text-align:center">face justice</td>
<td style="text-align:center">受到正义的制裁（主动表被动）</td>
</tr>
<tr>
<td style="text-align:center">reel</td>
<td style="text-align:center">n.卷轴，胶卷，卷筒</td>
</tr>
<tr>
<td style="text-align:center">Nanjing Memorial Hall</td>
<td style="text-align:center">南京大屠杀遇难同胞纪念馆</td>
</tr>
<tr>
<td style="text-align:center">retrace</td>
<td style="text-align:center">v.回溯，追溯，回顾</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">retrace</text> one's footsteps</td>
<td style="text-align:center">重温某人的足迹</td>
</tr>
<tr>
<td style="text-align:center">began a visual dialoge</td>
<td style="text-align:center">展开镜头对话</td>
</tr>
<tr>
<td style="text-align:center">the present prosperity and peace</td>
<td style="text-align:center">今日的繁荣祥和</td>
</tr>
<tr>
<td style="text-align:center">a dark period of history</td>
<td style="text-align:center">黑暗的历史时期</td>
</tr>
<tr>
<td style="text-align:center">humanitarian</td>
<td style="text-align:center">n.人道主义</td>
</tr>
</tbody>
</table>`,r:{minutes:1.64,words:493},y:"a",t:"04.The Only Motion images of the Nanjing Massacre"}}],["/english/video/5.html",{loader:()=>A(()=>import("./5.html-Daev_9wZ.js"),__vite__mapDeps([62,1])),meta:{d:1707969149e3,e:`
<p>video:<a href="https://www.bilibili.com/video/BV1vB4y157Ug?p=1&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">原神 -3.0 版本 PV-「千朵玫瑰带来的黎明」- 双语字幕</a></p>
<h2>Words</h2>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">calamity</td>
<td style="text-align:center">n.灾难，灾祸</td>
</tr>
<tr>
<td style="text-align:center">sage</td>
<td style="text-align:center">n.哲人，圣者</td>
</tr>
<tr>
<td style="text-align:center">whisk</td>
<td style="text-align:center">v.匆匆带走，迅速送走</td>
</tr>
<tr>
<td style="text-align:center">countless</td>
<td style="text-align:center">adj.无数的，数不清的，数量多的</td>
</tr>
<tr>
<td style="text-align:center">divine</td>
<td style="text-align:center">adj.神圣的；神的；n.牧师，神学家</td>
</tr>
<tr>
<td style="text-align:center">trainee</td>
<td style="text-align:center">n.实习生，见习生，练习生</td>
</tr>
<tr>
<td style="text-align:center">ranger</td>
<td style="text-align:center">n.护林员；园林管理员</td>
</tr>
<tr>
<td style="text-align:center">withering</td>
<td style="text-align:center">adj.尖刻的，使人难堪的 v.枯萎，凋谢</td>
</tr>
<tr>
<td style="text-align:center">millennium</td>
<td style="text-align:center">n.一千年，千周年纪念日</td>
</tr>
<tr>
<td style="text-align:center">nip</td>
<td style="text-align:center">v.夹，掐；啃咬；n.啃；寒意；掐；少量的烈酒</td>
</tr>
<tr>
<td style="text-align:center">utilize</td>
<td style="text-align:center">v.使用，运用，应用</td>
</tr>
<tr>
<td style="text-align:center">legacy</td>
<td style="text-align:center">n.遗产，遗留，后遗症</td>
</tr>
<tr>
<td style="text-align:center">auction</td>
<td style="text-align:center">n.拍卖</td>
</tr>
<tr>
<td style="text-align:center">merchant</td>
<td style="text-align:center">n.商人</td>
</tr>
<tr>
<td style="text-align:center">retribution</td>
<td style="text-align:center">n.严惩，惩罚；报应，报答</td>
</tr>
<tr>
<td style="text-align:center">confirmation</td>
<td style="text-align:center">n.确认书；证实；证明书；坚振</td>
</tr>
<tr>
<td style="text-align:center">frivolous</td>
<td style="text-align:center">adj.轻浮的，无聊的，愚蠢的</td>
</tr>
<tr>
<td style="text-align:center">pursue <text style="color:green;">frivolous</text> and meaningless activities</td>
<td style="text-align:center">追求轻浮而虚无的东西</td>
</tr>
<tr>
<td style="text-align:center">extract</td>
<td style="text-align:center">v.摘取，提取；索取；（用力）取出，拔出；获得</td>
</tr>
<tr>
<td style="text-align:center">utopia</td>
<td style="text-align:center">n.乌托邦</td>
</tr>
<tr>
<td style="text-align:center">validity</td>
<td style="text-align:center">n.有效性，正确；合法性</td>
</tr>
<tr>
<td style="text-align:center">verity</td>
<td style="text-align:center">n.（关于生命的）准则，信念</td>
</tr>
<tr>
<td style="text-align:center">defile</td>
<td style="text-align:center">v.弄脏，玷污；糟蹋</td>
</tr>
<tr>
<td style="text-align:center">seek <text style="color:green;">validity, verity,</text> and truth</td>
<td style="text-align:center">追求真实、真相与真理</td>
</tr>
<tr>
<td style="text-align:center">denial</td>
<td style="text-align:center">n.拒绝，否定；剥夺（应有的权利）</td>
</tr>
</tbody>
</table>`,r:{minutes:1.05,words:315},y:"a",t:"05. [Genshin Impact] The Morn a Thousand Roses Brings"}}],["/english/video/6.html",{loader:()=>A(()=>import("./6.html-BAqZtHwP.js"),__vite__mapDeps([63,1])),meta:{d:1707969149e3,e:`
<div class="hint-container tip">
<p class="hint-container-title">我有话说</p>
<p>《中国瞭望塔》的链接在这：<a href="https://m.weibo.cn/status/4782591880727150?sourceType=weixin&amp;from=10C8195010&amp;wm=9006_2001&amp;featurecode=newtitle" target="_blank" rel="noopener noreferrer">点击进入</a></p>
<p>音乐，故事，镜头，三者交相融合浑然一体，无缝转场的高级运用，强烈安利！！！你会感受到什么叫做中华文化的“博大精深”“敦实厚重”！</p>
</div>`,r:{minutes:2.19,words:658},y:"a",t:"06. 意大利导演 Leonardo Dalessandri 拍《中国瞭望塔》（Watchtower of China）有感"}}],["/english/video/7.html",{loader:()=>A(()=>import("./7.html-CY0sHzBq.js"),__vite__mapDeps([64,1])),meta:{d:1707969149e3,e:`
<h2>Words</h2>
<p>video：<a href="https://www.bilibili.com/video/BV1cG41147Jf?spm_id_from=333.337.search-card.all.click&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">【孟庆旸】“千里江山，不止青绿”</a></p>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">rolling</td>
<td style="text-align:center">adj.起伏的，规则的<br>v.翻滚，滚动（roll 的现在分词）</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">rolling</text> mountains，flowing rivers</td>
<td style="text-align:center">青绿氤氲，山河无垠</td>
</tr>
<tr>
<td style="text-align:center">hue</td>
<td style="text-align:center">n.颜色，色度，色调</td>
</tr>
<tr>
<td style="text-align:center">come alive</td>
<td style="text-align:center">走向现在，恢复生机</td>
</tr>
<tr>
<td style="text-align:center">legendary</td>
<td style="text-align:center">adj.非常著名的，享有盛名的；传奇的</td>
</tr>
<tr>
<td style="text-align:center">ancient sentiment</td>
<td style="text-align:center">adj.古老的情感</td>
</tr>
<tr>
<td style="text-align:center">conceptualize</td>
<td style="text-align:center">v.构思，使形成观念</td>
</tr>
<tr>
<td style="text-align:center">the <text style="color:green;">ancient sentiments</text> are <text style="color:green;">conceptualized</text> as the green mountains and rivers</td>
<td style="text-align:center">古老的情感化作青绿，化作山水</td>
</tr>
<tr>
<td style="text-align:center">gracefully</td>
<td style="text-align:center">v.优雅地，温文地</td>
</tr>
<tr>
<td style="text-align:center">roam</td>
<td style="text-align:center">v.漫游，漫步；徜徉；闲逛</td>
</tr>
<tr>
<td style="text-align:center">aesthetic</td>
<td style="text-align:center">n.美学；美感；审美观</td>
</tr>
<tr>
<td style="text-align:center">They dance <text style="color:green;">gracefully</text>, <text style="color:green;">roaming</text> through the traditional Chinese <text style="color:green;">aesthetic</text> charm</td>
<td style="text-align:center">翩若惊鸿间，是东方美学的意韵</td>
</tr>
<tr>
<td style="text-align:center">embrace</td>
<td style="text-align:center">v.拥抱；欣然接受；乐意采纳（思想，建议等）</td>
</tr>
<tr>
<td style="text-align:center">panorama</td>
<td style="text-align:center">n.全景；全景画卷</td>
</tr>
<tr>
<td style="text-align:center">The <text style="color:green;">Panorama</text> of Rivers and Mountains is far more than a piece of painting</td>
<td style="text-align:center">千里江山，不止青绿</td>
</tr>
<tr>
<td style="text-align:center">preface</td>
<td style="text-align:center">n.前言；（书的）序言</td>
</tr>
<tr>
<td style="text-align:center">postscript</td>
<td style="text-align:center">n.后记；跋；补充</td>
</tr>
<tr>
<td style="text-align:center">surviving work</td>
<td style="text-align:center">现存作品</td>
</tr>
<tr>
<td style="text-align:center">masterwork</td>
<td style="text-align:center">n.杰作，代表作</td>
</tr>
<tr>
<td style="text-align:center">depict   [dɪˈpɪkt]</td>
<td style="text-align:center">v.描绘；绘画；描写</td>
</tr>
<tr>
<td style="text-align:center"><em>A Thousand Li of Rivers and Mountains</em></td>
<td style="text-align:center">《千里江山图》</td>
</tr>
<tr>
<td style="text-align:center">gala</td>
<td style="text-align:center">n.庆典，盛会；演出</td>
</tr>
<tr>
<td style="text-align:center">CCTV Spring Festival <text style="color:green;">Gala</text></td>
<td style="text-align:center">央视春晚</td>
</tr>
<tr>
<td style="text-align:center">segment</td>
<td style="text-align:center">n.部分；份；片；段</td>
</tr>
<tr>
<td style="text-align:center"><em>The Journey of a Legendary Landscape Painting</em></td>
<td style="text-align:center">《只此青绿》</td>
</tr>
<tr>
<td style="text-align:center">dominant</td>
<td style="text-align:center">adj.占主导地位的；占优势的；首要的</td>
</tr>
<tr>
<td style="text-align:center">serve as the <text style="color:green;">dominant</text> hue</td>
<td style="text-align:center">成为主要色调</td>
</tr>
<tr>
<td style="text-align:center"><strong>literati</strong></td>
<td style="text-align:center">n.文人；文人学士</td>
</tr>
<tr>
<td style="text-align:center"><strong>literature</strong></td>
<td style="text-align:center">n.文学；文学作品；文献</td>
</tr>
<tr>
<td style="text-align:center"><strong>literacy</strong></td>
<td style="text-align:center">n.读写能力</td>
</tr>
<tr>
<td style="text-align:center"><strong>literate</strong></td>
<td style="text-align:center">adj.有读写能力的；有文化的<br>n.有学问的人</td>
</tr>
<tr>
<td style="text-align:center"><strong>literary</strong></td>
<td style="text-align:center">adj.文学上的；文学的</td>
</tr>
<tr>
<td style="text-align:center"><strong>literally</strong></td>
<td style="text-align:center">adv.字面上；（强调事实可能令人惊讶）真正地，确实地</td>
</tr>
<tr>
<td style="text-align:center">azurite</td>
<td style="text-align:center">n.石青，蓝铜矿</td>
</tr>
<tr>
<td style="text-align:center">malachite</td>
<td style="text-align:center">n.孔雀石</td>
</tr>
<tr>
<td style="text-align:center">extract</td>
<td style="text-align:center">v.摘录；提取；提炼；（用力）取出</td>
</tr>
<tr>
<td style="text-align:center">copper</td>
<td style="text-align:center">n.铜</td>
</tr>
<tr>
<td style="text-align:center">ore</td>
<td style="text-align:center">n.矿；矿石</td>
</tr>
<tr>
<td style="text-align:center">marvelous</td>
<td style="text-align:center">adj.不可思议的，了不起的；非凡的</td>
</tr>
<tr>
<td style="text-align:center">the <text style="color:green;">marvelous</text> colors of hills and waters</td>
<td style="text-align:center">色彩壮丽的丘壑林泉</td>
</tr>
<tr>
<td style="text-align:center">(the color) remain bright</td>
<td style="text-align:center">不褪色，保持原来的色彩</td>
</tr>
<tr>
<td style="text-align:center">rehearsal</td>
<td style="text-align:center">n.排练；预演；复述；重复</td>
</tr>
<tr>
<td style="text-align:center">transquility</td>
<td style="text-align:center">n.宁静；安静</td>
</tr>
<tr>
<td style="text-align:center">restrained</td>
<td style="text-align:center">adj.克制的，有节制的</td>
</tr>
<tr>
<td style="text-align:center">the calm and <text style="color:green;">restrained</text> beauty of Song dynasty</td>
<td style="text-align:center">沉稳内敛的宋代审美意境</td>
</tr>
<tr>
<td style="text-align:center">achieve inner peace</td>
<td style="text-align:center">收获平和的心态</td>
</tr>
<tr>
<td style="text-align:center">portray</td>
<td style="text-align:center">v.描绘，描画；描写</td>
</tr>
<tr>
<td style="text-align:center">fragility</td>
<td style="text-align:center">n.脆弱，易碎性；虚弱</td>
</tr>
<tr>
<td style="text-align:center">divergent</td>
<td style="text-align:center">adj.发散的，有分歧的</td>
</tr>
<tr>
<td style="text-align:center">temperament</td>
<td style="text-align:center">n.性情；（人或动物的）气质；性格</td>
</tr>
<tr>
<td style="text-align:center">imitate</td>
<td style="text-align:center">v.效仿；模仿（某人的讲话，举止）</td>
</tr>
<tr>
<td style="text-align:center">mimic</td>
<td style="text-align:center">v.模仿（人的言行举止）</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">mimic</text> the stunning mountainside in the paintings</td>
<td style="text-align:center">比喻险峰</td>
</tr>
<tr>
<td style="text-align:center">the aesthetics of Song dynasty</td>
<td style="text-align:center">宋代美学</td>
</tr>
<tr>
<td style="text-align:center">horticultural</td>
<td style="text-align:center">adj.文艺学的</td>
</tr>
<tr>
<td style="text-align:center">hashtag</td>
<td style="text-align:center">n.话题标签；推文话题</td>
</tr>
<tr>
<td style="text-align:center">trendy</td>
<td style="text-align:center">n.热搜</td>
</tr>
<tr>
<td style="text-align:center">phenomenal</td>
<td style="text-align:center">adj.了不起的，非凡的</td>
</tr>
<tr>
<td style="text-align:center">dynamism</td>
<td style="text-align:center">n.精力；活力；劲头</td>
</tr>
<tr>
<td style="text-align:center">The only impression towards Chinese culture was respect</td>
<td style="text-align:center">对中华文明的印象只有尊敬</td>
</tr>
<tr>
<td style="text-align:center">ponder</td>
<td style="text-align:center">v.思索，掂量</td>
</tr>
<tr>
<td style="text-align:center">gravitation</td>
<td style="text-align:center">n.万有引力；引力</td>
</tr>
<tr>
<td style="text-align:center">the magical <text style="color:green;">gravitation</text> in Chinese culture</td>
<td style="text-align:center">中华文化本身的魅力</td>
</tr>
<tr>
<td style="text-align:center">mission</td>
<td style="text-align:center">n.使命</td>
</tr>
<tr>
<td style="text-align:center">a sense of <text style="color:green;">mission</text></td>
<td style="text-align:center">使命感</td>
</tr>
<tr>
<td style="text-align:center">grandeur</td>
<td style="text-align:center">n.宏伟；壮丽；堂皇</td>
</tr>
<tr>
<td style="text-align:center">exquisite</td>
<td style="text-align:center">n.精致<br>adj.精致的；精美的</td>
</tr>
<tr>
<td style="text-align:center">tremendous</td>
<td style="text-align:center">adj.巨大的，极大的，极好的</td>
</tr>
<tr>
<td style="text-align:center">epic</td>
<td style="text-align:center">n.史诗；叙事诗；壮举</td>
</tr>
<tr>
<td style="text-align:center">a sense of magnificent epic</td>
<td style="text-align:center">壮美史诗感</td>
</tr>
<tr>
<td style="text-align:center">aboriginal</td>
<td style="text-align:center">n.原住民；（尤指澳大利亚的）土著<br>adj.澳大利亚土著的</td>
</tr>
<tr>
<td style="text-align:center">dedicated</td>
<td style="text-align:center">adj.献身的；专用的；专心致志的<br>v.把……奉献给</td>
</tr>
<tr>
<td style="text-align:center">traverse</td>
<td style="text-align:center">v.超越；穿过；横过</td>
</tr>
<tr>
<td style="text-align:center">traverse all the barriers of language</td>
<td style="text-align:center">超越了所有语言隔阂</td>
</tr>
<tr>
<td style="text-align:center">oriental</td>
<td style="text-align:center">adj.东方（尤指中国和日本的）；东方人的</td>
</tr>
<tr>
<td style="text-align:center">touch the soul</td>
<td style="text-align:center">触动灵魂</td>
</tr>
<tr>
<td style="text-align:center">interlock</td>
<td style="text-align:center">v.扣紧；（使）连锁；紧密连接</td>
</tr>
<tr>
<td style="text-align:center">Along the River During the Qingming Festival</td>
<td style="text-align:center">清明上河图</td>
</tr>
<tr>
<td style="text-align:center">merge</td>
<td style="text-align:center">v.合并，融入；（使）结合</td>
</tr>
<tr>
<td style="text-align:center">intrigues</td>
<td style="text-align:center">v.激起……的兴趣；引发……的好奇心<br>n.密谋策划；阴谋</td>
</tr>
</tbody>
</table>`,r:{minutes:4.65,words:1394},y:"a",t:"07. 【孟庆旸】“千里江山，不止青绿”The Panorama of Rivers and Mountains is far more than a piece of painting"}}],["/english/video/8.html",{loader:()=>A(()=>import("./8.html-Dhp2FI-P.js"),__vite__mapDeps([65,1])),meta:{d:1707969149e3,e:`
<h2>Words</h2>
<p>video：<a href="https://www.bilibili.com/video/BV1M14y1b7kT?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click&amp;vd_source=489ffc649530594b28a5b31b125daf69" target="_blank" rel="noopener noreferrer">【TED】宇宙中最神秘的恒星</a></p>
<table>
<thead>
<tr>
<th style="text-align:center">英语生词</th>
<th style="text-align:center">中文释义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">hypothesis</td>
<td style="text-align:center">n.假设；（有少量事实依据但是未被证明的）假说</td>
</tr>
<tr>
<td style="text-align:center">a last resort</td>
<td style="text-align:center">最后一根稻草</td>
</tr>
<tr>
<td style="text-align:center">stare</td>
<td style="text-align:center">v.观测；盯着</td>
</tr>
<tr>
<td style="text-align:center"><text style="color:green;">stare</text> at a single field in the sky</td>
<td style="text-align:center">观测一小块天区</td>
</tr>
<tr>
<td style="text-align:center">align</td>
<td style="text-align:center">v.排列，校准，使……成一条直线</td>
</tr>
<tr>
<td style="text-align:center">dip</td>
<td style="text-align:center">v.蘸，浸；<br>n.（暂时的）下降；低洼处</td>
</tr>
<tr>
<td style="text-align:center">sophisticated</td>
<td style="text-align:center">adj.复杂的，精密的，先进的，见多识广的</td>
</tr>
<tr>
<td style="text-align:center">citizen science project</td>
<td style="text-align:center">公民科学项目</td>
</tr>
<tr>
<td style="text-align:center">pattern recognition</td>
<td style="text-align:center">模式识别</td>
</tr>
<tr>
<td style="text-align:center">skepticism</td>
<td style="text-align:center">n.怀疑论；怀疑主义者</td>
</tr>
<tr>
<td style="text-align:center">versus</td>
<td style="text-align:center">v.对抗；（比较两种不同选择，想法）与……相比</td>
</tr>
<tr>
<td style="text-align:center">gamble</td>
<td style="text-align:center">n.赌博；冒险；打赌</td>
</tr>
<tr>
<td style="text-align:center">forum</td>
<td style="text-align:center">n.论坛；公开讨论场所</td>
</tr>
<tr>
<td style="text-align:center">asymmetric</td>
<td style="text-align:center">adj.不对称的</td>
</tr>
<tr>
<td style="text-align:center">dim</td>
<td style="text-align:center">adj.昏暗的；黯淡的；v.变暗，变微弱</td>
</tr>
<tr>
<td style="text-align:center">superimpose</td>
<td style="text-align:center">v.叠加；使重叠</td>
</tr>
<tr>
<td style="text-align:center">firsthand</td>
<td style="text-align:center">adj.第一手的，直接的;adv.直接地</td>
</tr>
<tr>
<td style="text-align:center">collide</td>
<td style="text-align:center">v.碰撞；冲突；抵触；不一致</td>
</tr>
<tr>
<td style="text-align:center">a huge swam of</td>
<td style="text-align:center">一大群，一大批</td>
</tr>
<tr>
<td style="text-align:center">contrive</td>
<td style="text-align:center">v.（不顾困难而）设法做到；（克服困难）促成（某事）</td>
</tr>
<tr>
<td style="text-align:center">acronym</td>
<td style="text-align:center">n.缩略语，梗</td>
</tr>
<tr>
<td style="text-align:center">megastructure</td>
<td style="text-align:center">n.巨型结构，超级建筑</td>
</tr>
<tr>
<td style="text-align:center">leak</td>
<td style="text-align:center">v.漏；泄露（秘密信息）；n.漏洞；裂缝</td>
</tr>
</tbody>
</table>`,r:{minutes:1.01,words:304},y:"a",t:"08. 【TED】宇宙中最神秘的恒星"}}],["/english/video/9.html",{loader:()=>A(()=>import("./9.html-CdirWuWF.js"),__vite__mapDeps([66,1])),meta:{d:1707969149e3,e:`
<div style="text-align: center; ">
<img alt="math_2" src="https://cdn.statically.io/gh/dream-oyh/dream-oyh.github.io/images/English_1.jpg">
</div>
<div style="text-align: center; ">
We lie awake in love and in fear, in <text style="color:green;">turmoil</text> and in tears.
<p>We stare at walls and drink until they <text style="color:green;">speak back</text>.We <text style="color:green;">twist</text> in our self-made cages and pray that we aren't - right this minute - about to make some <text style="color:green;">fateful</text> life-altering mistake.</p>
<p>This is a collection of music written in the middle of the night, a journey through terrors and sweet dreams. The floors we pace and the <text style="color:green;">demons</text> we face.For all of us who have <text style="color:green;">tossed</text> and turned and decided to keep the lanterns lit and go searching - hoping the just maybe, when the clock strikes twelve……we'll meet ourselves.</p>
<p>Midnights, the stories of 13 sleepless nights <text style="color:green;">scattered</text> throughout my life, will be out October 21. Meet me at midnight.</p>
</div>`,r:{minutes:.9,words:269},y:"a",t:"09. 【Taylor Swift】Midnights 新专辑！！"}}],["/code/python/pytorch/1pytorch.html",{loader:()=>A(()=>import("./1pytorch.html-AgXdLiRl.js"),__vite__mapDeps([67,1])),meta:{d:17080416e5,l:"2024年2月16日",e:`
<p><a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">官网</a></p>
<p><a href="https://tangshusen.me/Dive-into-DL-PyTorch/" target="_blank" rel="noopener noreferrer">《动手学深度学习-Pytorch 版》学习文档</a></p>
<p><a href="https://zh.d2l.ai/index.html" target="_blank" rel="noopener noreferrer">《动手学深度学习》原书文档</a></p>`,r:{minutes:5.19,words:1556},y:"a",t:"Pytorch 的配置与基本操作"}}],["/code/python/pytorch/2.1linear_regression.html",{loader:()=>A(()=>import("./2.1linear_regression.html-8FJuyJTR.js"),__vite__mapDeps([68,1])),meta:{d:1708128e6,l:"2024年2月17日",e:`
<div class="hint-container tip">
<p class="hint-container-title">需要导入模块</p>
<div class="language-python" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>data <span class="token keyword">as</span> Data
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn

<span class="token keyword">from</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">import</span> init
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>optim <span class="token keyword">as</span> optim
</code></pre></div></div>`,r:{minutes:5.21,words:1564},y:"a",t:"线性回归实现"}}],["/code/python/pytorch/2.2FashionMNIST.html",{loader:()=>A(()=>import("./2.2FashionMNIST.html-BA1gIuon.js"),__vite__mapDeps([69,1])),meta:{d:1708128e6,l:"2024年2月17日",e:`
<p>FashionMNIST 数据集是一个包含 60,000 个训练图像和 10,000 个测试图像的数据集。引入该数据集后，我们可以更方便和直观地比较模型精度和计算效率。</p>
<h2>导入本文所需要的包</h2>
<div class="language-python" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>data <span class="token keyword">as</span> Data
<span class="token keyword">import</span> torchvision

<span class="token keyword">from</span> <span class="token punctuation">.</span> <span class="token keyword">import</span> d2lzh_pytorch <span class="token keyword">as</span> d2l  <span class="token comment"># 需要根据实际目录更改</span>
</code></pre></div>`,r:{minutes:2.63,words:788},y:"a",t:"FashionMNIST 数据集"}}],["/code/python/pytorch/2.3softmax.html",{loader:()=>A(()=>import("./2.3softmax.html-DolAcmC_.js"),__vite__mapDeps([70,1])),meta:{d:1708128e6,l:"2024年2月17日",e:`
<p><a href="https://tangshusen.me/Dive-into-DL-PyTorch/#/chapter03_DL-basics/3.4_softmax-regression" target="_blank" rel="noopener noreferrer">softmax 原理介绍</a></p>
<h2>导入所需的包和库</h2>
<div class="language-python" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn
<span class="token keyword">import</span> d2lzh_pytorch <span class="token keyword">as</span> d2l
</code></pre></div>`,r:{minutes:1.98,words:593},y:"a",t:"softmax 回归实现"}}],["/code/python/pytorch/2.4MLP.html",{loader:()=>A(()=>import("./2.4MLP.html-BAlrNjdW.js"),__vite__mapDeps([71,1])),meta:{d:17082144e5,l:"2024年2月18日",e:`
<p><a href="https://zh.wikipedia.org/wiki/%E5%A4%9A%E5%B1%82%E6%84%9F%E7%9F%A5%E5%99%A8" target="_blank" rel="noopener noreferrer">是什么？</a></p>
<h2>导入需要的包</h2>
<div class="language-python" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn
<span class="token keyword">import</span> torch
<span class="token keyword">import</span> sys

sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span>
<span class="token keyword">import</span> d2lzh_pytorch <span class="token keyword">as</span> d2l
<span class="token keyword">from</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">import</span> init
</code></pre></div>`,r:{minutes:1.57,words:472},y:"a",t:"多层感知机（MLP）"}}],["/code/python/pytorch/3.1Deeplearning_basic.html",{loader:()=>A(()=>import("./3.1Deeplearning_basic.html-HV6EXDNL.js"),__vite__mapDeps([72,1])),meta:{d:17082144e5,l:"2024年2月18日",e:`
<h2>模型构建</h2>
<p>根据之前章节，我们已经能够发现，利用<code>nn.Module</code>和<code>nn.Sequential</code>可以很方便地构建模型，并且<code>nn.Sequential</code>本身也是<code>nn.Module</code>的一个继承类。所以，通过<code>nn.Module</code>来构建继承类也是非常通用的模型构建方式，一般来说，在继承类中我们会重载<code>nn.Module</code>的<code>forward()</code>函数，比如说我们可以通过继承类很容易地构建一个多层感知机模型：</p>
`,r:{minutes:7.5,words:2250},y:"a",t:"深度学习基础"}}],["/code/python/pytorch/4.1convolutional_nn_basic.html",{loader:()=>A(()=>import("./4.1convolutional_nn_basic.html-CryQbnmo.js"),__vite__mapDeps([73,1])),meta:{d:17083008e5,l:"2024年2月19日",e:`
<h2>导入需要的包</h2>
<div class="language-python" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn
<span class="token keyword">import</span> torchvision
</code></pre></div>`,r:{minutes:7.84,words:2353},y:"a",t:"卷积神经网络基础"}}],["/code/python/pytorch/4.2LeNet.html",{loader:()=>A(()=>import("./4.2LeNet.html-DJZf4Wef.js"),__vite__mapDeps([74,1])),meta:{d:17083008e5,l:"2024年2月19日",e:`
<div class="hint-container tip">
<p class="hint-container-title">本节学习要点</p>
<ol>
<li>了解 LeNet 网络结构</li>
<li>从搭建<code>LeNet</code>网络扩展到一般的 CNN 模型搭建</li>
<li>学习如何设置 GPU 加速模型训练，并学习如何定义训练函数</li>
</ol>
</div>
<h2>网络结构图</h2>
<figure><img src="https://tangshusen.me/Dive-into-DL-PyTorch/img/chapter05/5.5_lenet.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,r:{minutes:1.78,words:533},y:"a",t:"LeNet"}}],["/code/python/pytorch/4.3AlexNet.html",{loader:()=>A(()=>import("./4.3AlexNet.html-D-o4K_ih.js"),__vite__mapDeps([75,1])),meta:{d:17083872e5,l:"2024年2月20日",e:`
<div class="hint-container tip">
<p class="hint-container-title">本节学习要点</p>
<ol>
<li>了解 AlexNet 网络结构</li>
<li>学习<code>torchvision.transforms.Resize()</code>的使用并拓展到更多<code>torchvision.transforms</code>实例的用法，可以见<a href="/code/python/pytorch/3.1Deeplearning_basic.html#torchvision-transforms%E5%AE%9E%E4%BE%8B" target="_blank">此处</a>。</li>
</ol>
</div>`,r:{minutes:1.83,words:549},y:"a",t:"AlexNet"}}],["/code/python/pytorch/4.4VGG.html",{loader:()=>A(()=>import("./4.4VGG.html-DlHRZA03.js"),__vite__mapDeps([76,1])),meta:{d:17088192e5,l:"2024年2月25日",e:`
<blockquote>
<p>What is the VGG?</p>
</blockquote>
<p>VGG 块一般规律是连续几个填充为 1，卷积层尺寸为 3x3 的卷积层，之后接上一个步幅为 2，形状为 2x2 的最大池化层。我们可以定义一个函数，来定义 VGG 块，该 VGG 块又可以运用到其他模型的定义中。</p>
<div class="hint-container tip">
<p class="hint-container-title">本节学习要点</p>
<ol>
<li>学习如何用函数构建模块</li>
<li>学习 VGG 块的使用</li>
</ol>
</div>`,r:{minutes:2.98,words:894},y:"a",t:"VGG（使用重复元素的网络）"}}],["/code/python/pytorch/4.5NiN.html",{loader:()=>A(()=>import("./4.5NiN.html-DQ3bJph1.js"),__vite__mapDeps([77,1])),meta:{d:17088192e5,l:"2024年2月25日",e:`
<div class="hint-container tip">
<p class="hint-container-title">本节学习要点</p>
<ol>
<li>掌握 1x1 卷积层代替全连接层的设计思路</li>
<li>学会 1x1 卷积层的定义和使用</li>
<li>了解 NiN 结构的定义</li>
</ol>
</div>
<blockquote>
<p>What is it NiN?</p>
</blockquote>
<p>相较于 LeNet, AlexNet 与 VGG 提供了更为深度的学习网络，能够学习更复杂的特征，但是 AlexNet 与 VGG 的基本结构都是卷积层 + 全连接层，而全连接层作为最后一端，参数过多，计算量大，因此 NiN 提出，将卷积层与全连接层交替排列，减少计算，提高效率。但是问题在于，卷积层的输入输出均为四维数组，可是全连接层的输入输出为二维数组，难以实现，这时候需要用到 1x1 卷积层用来充当全连接层的作用。</p>`,r:{minutes:3.65,words:1096},y:"a",t:"NiN（网络中的网络）"}}],["/code/python/pytorch/4.6GoogleNet.html",{loader:()=>A(()=>import("./4.6GoogleNet.html-BcVFKOuo.js"),__vite__mapDeps([78,1])),meta:{d:17089056e5,l:"2024年2月26日",e:`
<h2>导入需要的包</h2>
<div class="language-python" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> sys

<span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn
<span class="token keyword">from</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">import</span> functional <span class="token keyword">as</span> F

sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span>
<span class="token keyword">import</span> d2lzh_pytorch <span class="token keyword">as</span> d2l
</code></pre></div>`,r:{minutes:1.75,words:526},y:"a",t:"GoogleNet"}}],["/code/python/pytorch/4.7ResNet.html",{loader:()=>A(()=>import("./4.7ResNet.html-BzLLMMqb.js"),__vite__mapDeps([79,1])),meta:{d:17089056e5,l:"2024年2月26日",e:`
<blockquote>
<p>What is ResNet?</p>
</blockquote>
<p>简单来说，在模型训练过程中，直接去拟合我们要的<span v-pre="" class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>并不容易，但是通过测试发现，直接去拟合<span v-pre="" class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>−</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">f(x)-x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span></span></span></span>会容易很多，所以残差网络其实就是在一系列卷积计算过后，先减去一个输入矩阵，再通过激活函数计算输出，这样就相当于拟合了<span v-pre="" class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>−</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">f(x)-x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span></span></span></span>。</p>`,r:{minutes:1.88,words:565},y:"a",t:"ResNet"}}],["/code/python/pytorch/img.html",{loader:()=>A(()=>import("./img.html-DBW7BFka.js"),__vite__mapDeps([80,1])),meta:{d:1709037353e3,e:`
<p>在我学习 pytorch 文档学到残差神经网络的时候，我发现网络的 python 搭建已经不是一个难事了，难的应该是网络的设计，而 pytorch 学习文档提供了非常多现代卷积神经网络的实现，但是并没有为这些神经网络提供一个可视化的模型出来，这样对于初学者而言，并不能准确 get 到各种网络之间的区别与联系，所以我在想能不能有什么工具是能把这些网络可视化出来的。</p>
<p>第一个念头是数学建模时经常用到的 PPT，用 PPT 来画神经网络可视化，但是一想到要这么多的卷积核，还要保证相对尺寸符合实际，再想到全连接层满满的线条，我果断放弃了 PPT 作图，试着在 b 站上搜一搜有没有针对于神经网络的可视化工具，没想到还真有，而且很多很丰富。所以我单开了这一部分内容，来呈现好用的可视化工具以及其做出的效果。</p>`,r:{minutes:1.9,words:570},y:"a",t:"神经网络可视化工具"}}],["/404.html",{loader:()=>A(()=>import("./404.html-CROBkEb5.js"),__vite__mapDeps([81,1])),meta:{y:"p",t:""}}],["/code/python/",{loader:()=>A(()=>import("./index.html-qfMYXHdp.js"),__vite__mapDeps([82,1])),meta:{y:"p",t:"Python"}}],["/code/tips/",{loader:()=>A(()=>import("./index.html-CjU85K0t.js"),__vite__mapDeps([83,1])),meta:{y:"p",t:"Tips"}}],["/english/china/",{loader:()=>A(()=>import("./index.html-D0kwyywN.js"),__vite__mapDeps([84,1])),meta:{y:"p",t:"China"}}],["/english/",{loader:()=>A(()=>import("./index.html-B5d66F4N.js"),__vite__mapDeps([85,1])),meta:{y:"p",t:"English"}}],["/english/free/",{loader:()=>A(()=>import("./index.html-DnFQYfDL.js"),__vite__mapDeps([86,1])),meta:{y:"p",t:"Free"}}],["/english/video/",{loader:()=>A(()=>import("./index.html-QkaRx9Qn.js"),__vite__mapDeps([87,1])),meta:{y:"p",t:"Video"}}],["/code/python/pytorch/",{loader:()=>A(()=>import("./index.html-JCE7DBj7.js"),__vite__mapDeps([88,1])),meta:{y:"p",t:"Pytorch"}}],["/category/",{loader:()=>A(()=>import("./index.html-DJGoxurV.js"),__vite__mapDeps([89,1])),meta:{y:"p",t:"分类",I:!1}}],["/category/%E6%8E%A8%E8%8D%90/",{loader:()=>A(()=>import("./index.html-CkznHMdp.js"),__vite__mapDeps([90,1])),meta:{y:"p",t:"推荐 分类",I:!1}}],["/category/%E5%8D%9A%E5%AE%A2/",{loader:()=>A(()=>import("./index.html-Ph45tBZp.js"),__vite__mapDeps([91,1])),meta:{y:"p",t:"博客 分类",I:!1}}],["/category/%E8%AE%A1%E7%AE%97%E6%9C%BA/",{loader:()=>A(()=>import("./index.html-Cl0svaMu.js"),__vite__mapDeps([92,1])),meta:{y:"p",t:"计算机 分类",I:!1}}],["/category/%E5%BA%95%E5%B1%82/",{loader:()=>A(()=>import("./index.html-CfpnTLzP.js"),__vite__mapDeps([93,1])),meta:{y:"p",t:"底层 分类",I:!1}}],["/category/%E5%B7%A5%E5%85%B7/",{loader:()=>A(()=>import("./index.html-CrcZW11-.js"),__vite__mapDeps([94,1])),meta:{y:"p",t:"工具 分类",I:!1}}],["/category/%E5%89%8D%E7%AB%AF/",{loader:()=>A(()=>import("./index.html-DXEKbAu2.js"),__vite__mapDeps([95,1])),meta:{y:"p",t:"前端 分类",I:!1}}],["/category/%E7%BC%96%E7%A8%8B/",{loader:()=>A(()=>import("./index.html-C2FX06M9.js"),__vite__mapDeps([96,1])),meta:{y:"p",t:"编程 分类",I:!1}}],["/category/%E7%AC%94%E8%AE%B0/",{loader:()=>A(()=>import("./index.html-6-JmnUIS.js"),__vite__mapDeps([97,1])),meta:{y:"p",t:"笔记 分类",I:!1}}],["/category/%E8%B5%84%E6%96%99%E7%AB%99/",{loader:()=>A(()=>import("./index.html-q6hQ-Iah.js"),__vite__mapDeps([98,1])),meta:{y:"p",t:"资料站 分类",I:!1}}],["/category/python-%E5%BA%93/",{loader:()=>A(()=>import("./index.html-Y4hgWQLM.js"),__vite__mapDeps([99,1])),meta:{y:"p",t:"Python 库 分类",I:!1}}],["/category/%E9%94%A6%E5%9B%8A/",{loader:()=>A(()=>import("./index.html-ArbKwq8S.js"),__vite__mapDeps([100,1])),meta:{y:"p",t:"锦囊 分类",I:!1}}],["/tag/",{loader:()=>A(()=>import("./index.html-CfzJHYY3.js"),__vite__mapDeps([101,1])),meta:{y:"p",t:"标签",I:!1}}],["/tag/%E6%96%87%E7%AB%A0/",{loader:()=>A(()=>import("./index.html-CQmZFPWk.js"),__vite__mapDeps([102,1])),meta:{y:"p",t:"标签: 文章",I:!1}}],["/tag/index/",{loader:()=>A(()=>import("./index.html-CEZ8uMZH.js"),__vite__mapDeps([103,1])),meta:{y:"p",t:"标签: index",I:!1}}],["/tag/%E6%97%A5%E5%BF%97/",{loader:()=>A(()=>import("./index.html-CFGKjhAl.js"),__vite__mapDeps([104,1])),meta:{y:"p",t:"标签: 日志",I:!1}}],["/tag/%E8%AE%A1%E5%88%92/",{loader:()=>A(()=>import("./index.html-BwpLW5j6.js"),__vite__mapDeps([105,1])),meta:{y:"p",t:"标签: 计划",I:!1}}],["/tag/%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95/",{loader:()=>A(()=>import("./index.html-CohGeKcn.js"),__vite__mapDeps([106,1])),meta:{y:"p",t:"标签: 问题记录",I:!1}}],["/tag/%E7%AC%94%E8%AE%B0/",{loader:()=>A(()=>import("./index.html-CK40B7Kc.js"),__vite__mapDeps([107,1])),meta:{y:"p",t:"标签: 笔记",I:!1}}],["/tag/%E6%95%99%E7%A8%8B/",{loader:()=>A(()=>import("./index.html-brjB2nMK.js"),__vite__mapDeps([108,1])),meta:{y:"p",t:"标签: 教程",I:!1}}],["/star/",{loader:()=>A(()=>import("./index.html-D2NXedZS.js"),__vite__mapDeps([109,1])),meta:{y:"p",t:"星标",I:!1}}],["/timeline/",{loader:()=>A(()=>import("./index.html-DDkKCAOD.js"),__vite__mapDeps([110,1])),meta:{y:"p",t:"时间轴",I:!1}}]]);/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Tn=typeof window<"u";function M2(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const ge=Object.assign;function Ul(e,t){const n={};for(const r in t){const l=t[r];n[r]=yt(l)?l.map(e):e(l)}return n}const ur=()=>{},yt=Array.isArray,R2=/\/$/,O2=e=>e.replace(R2,"");function ql(e,t,n="/"){let r,l={},a="",s="";const i=t.indexOf("#");let u=t.indexOf("?");return i<u&&i>=0&&(u=-1),u>-1&&(r=t.slice(0,u),a=t.slice(u+1,i>-1?i:t.length),l=e(a)),i>-1&&(r=r||t.slice(0,i),s=t.slice(i,t.length)),r=j2(r??t,n),{fullPath:r+(a&&"?")+a+s,path:r,query:l,hash:s}}function $2(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Eo(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function D2(e,t,n){const r=t.matched.length-1,l=n.matched.length-1;return r>-1&&r===l&&zn(t.matched[r],n.matched[l])&&kc(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function zn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function kc(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!N2(e[n],t[n]))return!1;return!0}function N2(e,t){return yt(e)?Co(e,t):yt(t)?Co(t,e):e===t}function Co(e,t){return yt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function j2(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),l=r[r.length-1];(l===".."||l===".")&&r.push("");let a=n.length-1,s,i;for(s=0;s<r.length;s++)if(i=r[s],i!==".")if(i==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var xr;(function(e){e.pop="pop",e.push="push"})(xr||(xr={}));var dr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(dr||(dr={}));function V2(e){if(!e)if(Tn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),O2(e)}const H2=/^[^#]+#/;function z2(e,t){return e.replace(H2,"#")+t}function B2(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const kl=()=>({left:window.pageXOffset,top:window.pageYOffset});function F2(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),l=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!l)return;t=B2(l,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function To(e,t){return(history.state?history.state.position-t:-1)+e}const xa=new Map;function G2(e,t){xa.set(e,t)}function W2(e){const t=xa.get(e);return xa.delete(e),t}let U2=()=>location.protocol+"//"+location.host;function Ec(e,t){const{pathname:n,search:r,hash:l}=t,a=e.indexOf("#");if(a>-1){let i=l.includes(e.slice(a))?e.slice(a).length:1,u=l.slice(i);return u[0]!=="/"&&(u="/"+u),Eo(u,"")}return Eo(n,e)+r+l}function q2(e,t,n,r){let l=[],a=[],s=null;const i=({state:f})=>{const h=Ec(e,location),v=n.value,w=t.value;let _=0;if(f){if(n.value=h,t.value=f,s&&s===v){s=null;return}_=w?f.position-w.position:0}else r(h);l.forEach(y=>{y(n.value,v,{delta:_,type:xr.pop,direction:_?_>0?dr.forward:dr.back:dr.unknown})})};function u(){s=n.value}function c(f){l.push(f);const h=()=>{const v=l.indexOf(f);v>-1&&l.splice(v,1)};return a.push(h),h}function d(){const{history:f}=window;f.state&&f.replaceState(ge({},f.state,{scroll:kl()}),"")}function p(){for(const f of a)f();a=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:u,listen:c,destroy:p}}function Lo(e,t,n,r=!1,l=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:l?kl():null}}function K2(e){const{history:t,location:n}=window,r={value:Ec(e,n)},l={value:t.state};l.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function a(u,c,d){const p=e.indexOf("#"),f=p>-1?(n.host&&document.querySelector("base")?e:e.slice(p))+u:U2()+e+u;try{t[d?"replaceState":"pushState"](c,"",f),l.value=c}catch(h){console.error(h),n[d?"replace":"assign"](f)}}function s(u,c){const d=ge({},t.state,Lo(l.value.back,u,l.value.forward,!0),c,{position:l.value.position});a(u,d,!0),r.value=u}function i(u,c){const d=ge({},l.value,t.state,{forward:u,scroll:kl()});a(d.current,d,!0);const p=ge({},Lo(r.value,u,null),{position:d.position+1},c);a(u,p,!1),r.value=u}return{location:r,state:l,push:i,replace:s}}function Z2(e){e=V2(e);const t=K2(e),n=q2(e,t.state,t.location,t.replace);function r(a,s=!0){s||n.pauseListeners(),history.go(a)}const l=ge({location:"",base:e,go:r,createHref:z2.bind(null,e)},t,n);return Object.defineProperty(l,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(l,"state",{enumerable:!0,get:()=>t.state.value}),l}function Y2(e){return typeof e=="string"||e&&typeof e=="object"}function Cc(e){return typeof e=="string"||typeof e=="symbol"}const Pt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Tc=Symbol("");var So;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(So||(So={}));function Bn(e,t){return ge(new Error,{type:e,[Tc]:!0},t)}function At(e,t){return e instanceof Error&&Tc in e&&(t==null||!!(e.type&t))}const Ao="[^/]+?",X2={sensitive:!1,strict:!1,start:!0,end:!0},J2=/[.+*?^${}()[\]/\\]/g;function Q2(e,t){const n=ge({},X2,t),r=[];let l=n.start?"^":"";const a=[];for(const c of e){const d=c.length?[]:[90];n.strict&&!c.length&&(l+="/");for(let p=0;p<c.length;p++){const f=c[p];let h=40+(n.sensitive?.25:0);if(f.type===0)p||(l+="/"),l+=f.value.replace(J2,"\\$&"),h+=40;else if(f.type===1){const{value:v,repeatable:w,optional:_,regexp:y}=f;a.push({name:v,repeatable:w,optional:_});const S=y||Ao;if(S!==Ao){h+=10;try{new RegExp(`(${S})`)}catch(C){throw new Error(`Invalid custom RegExp for param "${v}" (${S}): `+C.message)}}let b=w?`((?:${S})(?:/(?:${S}))*)`:`(${S})`;p||(b=_&&c.length<2?`(?:/${b})`:"/"+b),_&&(b+="?"),l+=b,h+=20,_&&(h+=-8),w&&(h+=-20),S===".*"&&(h+=-50)}d.push(h)}r.push(d)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}n.strict||(l+="/?"),n.end?l+="$":n.strict&&(l+="(?:/|$)");const s=new RegExp(l,n.sensitive?"":"i");function i(c){const d=c.match(s),p={};if(!d)return null;for(let f=1;f<d.length;f++){const h=d[f]||"",v=a[f-1];p[v.name]=h&&v.repeatable?h.split("/"):h}return p}function u(c){let d="",p=!1;for(const f of e){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const h of f)if(h.type===0)d+=h.value;else if(h.type===1){const{value:v,repeatable:w,optional:_}=h,y=v in c?c[v]:"";if(yt(y)&&!w)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const S=yt(y)?y.join("/"):y;if(!S)if(_)f.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${v}"`);d+=S}}return d||"/"}return{re:s,score:r,keys:a,parse:i,stringify:u}}function e0(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function t0(e,t){let n=0;const r=e.score,l=t.score;for(;n<r.length&&n<l.length;){const a=e0(r[n],l[n]);if(a)return a;n++}if(Math.abs(l.length-r.length)===1){if(Io(r))return 1;if(Io(l))return-1}return l.length-r.length}function Io(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const n0={type:0,value:""},r0=/[a-zA-Z0-9_]/;function l0(e){if(!e)return[[]];if(e==="/")return[[n0]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(h){throw new Error(`ERR (${n})/"${c}": ${h}`)}let n=0,r=n;const l=[];let a;function s(){a&&l.push(a),a=[]}let i=0,u,c="",d="";function p(){c&&(n===0?a.push({type:0,value:c}):n===1||n===2||n===3?(a.length>1&&(u==="*"||u==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:c,regexp:d,repeatable:u==="*"||u==="+",optional:u==="*"||u==="?"})):t("Invalid state to consume buffer"),c="")}function f(){c+=u}for(;i<e.length;){if(u=e[i++],u==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:u==="/"?(c&&p(),s()):u===":"?(p(),n=1):f();break;case 4:f(),n=r;break;case 1:u==="("?n=2:r0.test(u)?f():(p(),n=0,u!=="*"&&u!=="?"&&u!=="+"&&i--);break;case 2:u===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+u:n=3:d+=u;break;case 3:p(),n=0,u!=="*"&&u!=="?"&&u!=="+"&&i--,d="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${c}"`),p(),s(),l}function a0(e,t,n){const r=Q2(l0(e.path),n),l=ge(r,{record:e,parent:t,children:[],alias:[]});return t&&!l.record.aliasOf==!t.record.aliasOf&&t.children.push(l),l}function s0(e,t){const n=[],r=new Map;t=Ro({strict:!1,end:!0,sensitive:!1},t);function l(d){return r.get(d)}function a(d,p,f){const h=!f,v=o0(d);v.aliasOf=f&&f.record;const w=Ro(t,d),_=[v];if("alias"in d){const b=typeof d.alias=="string"?[d.alias]:d.alias;for(const C of b)_.push(ge({},v,{components:f?f.record.components:v.components,path:C,aliasOf:f?f.record:v}))}let y,S;for(const b of _){const{path:C}=b;if(p&&C[0]!=="/"){const D=p.record.path,E=D[D.length-1]==="/"?"":"/";b.path=p.record.path+(C&&E+C)}if(y=a0(b,p,w),f?f.alias.push(y):(S=S||y,S!==y&&S.alias.push(y),h&&d.name&&!Mo(y)&&s(d.name)),v.children){const D=v.children;for(let E=0;E<D.length;E++)a(D[E],y,f&&f.children[E])}f=f||y,(y.record.components&&Object.keys(y.record.components).length||y.record.name||y.record.redirect)&&u(y)}return S?()=>{s(S)}:ur}function s(d){if(Cc(d)){const p=r.get(d);p&&(r.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(s),p.alias.forEach(s))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&r.delete(d.record.name),d.children.forEach(s),d.alias.forEach(s))}}function i(){return n}function u(d){let p=0;for(;p<n.length&&t0(d,n[p])>=0&&(d.record.path!==n[p].record.path||!Lc(d,n[p]));)p++;n.splice(p,0,d),d.record.name&&!Mo(d)&&r.set(d.record.name,d)}function c(d,p){let f,h={},v,w;if("name"in d&&d.name){if(f=r.get(d.name),!f)throw Bn(1,{location:d});w=f.record.name,h=ge(Po(p.params,f.keys.filter(S=>!S.optional).map(S=>S.name)),d.params&&Po(d.params,f.keys.map(S=>S.name))),v=f.stringify(h)}else if("path"in d)v=d.path,f=n.find(S=>S.re.test(v)),f&&(h=f.parse(v),w=f.record.name);else{if(f=p.name?r.get(p.name):n.find(S=>S.re.test(p.path)),!f)throw Bn(1,{location:d,currentLocation:p});w=f.record.name,h=ge({},p.params,d.params),v=f.stringify(h)}const _=[];let y=f;for(;y;)_.unshift(y.record),y=y.parent;return{name:w,path:v,params:h,matched:_,meta:c0(_)}}return e.forEach(d=>a(d)),{addRoute:a,resolve:c,removeRoute:s,getRoutes:i,getRecordMatcher:l}}function Po(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function o0(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:i0(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function i0(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Mo(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function c0(e){return e.reduce((t,n)=>ge(t,n.meta),{})}function Ro(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function Lc(e,t){return t.children.some(n=>n===e||Lc(e,n))}const Sc=/#/g,u0=/&/g,d0=/\//g,p0=/=/g,f0=/\?/g,Ac=/\+/g,h0=/%5B/g,g0=/%5D/g,Ic=/%5E/g,m0=/%60/g,Pc=/%7B/g,v0=/%7C/g,Mc=/%7D/g,y0=/%20/g;function ls(e){return encodeURI(""+e).replace(v0,"|").replace(h0,"[").replace(g0,"]")}function b0(e){return ls(e).replace(Pc,"{").replace(Mc,"}").replace(Ic,"^")}function wa(e){return ls(e).replace(Ac,"%2B").replace(y0,"+").replace(Sc,"%23").replace(u0,"%26").replace(m0,"`").replace(Pc,"{").replace(Mc,"}").replace(Ic,"^")}function x0(e){return wa(e).replace(p0,"%3D")}function w0(e){return ls(e).replace(Sc,"%23").replace(f0,"%3F")}function _0(e){return e==null?"":w0(e).replace(d0,"%2F")}function pl(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function k0(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let l=0;l<r.length;++l){const a=r[l].replace(Ac," "),s=a.indexOf("="),i=pl(s<0?a:a.slice(0,s)),u=s<0?null:pl(a.slice(s+1));if(i in t){let c=t[i];yt(c)||(c=t[i]=[c]),c.push(u)}else t[i]=u}return t}function Oo(e){let t="";for(let n in e){const r=e[n];if(n=x0(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(yt(r)?r.map(a=>a&&wa(a)):[r&&wa(r)]).forEach(a=>{a!==void 0&&(t+=(t.length?"&":"")+n,a!=null&&(t+="="+a))})}return t}function E0(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=yt(r)?r.map(l=>l==null?null:""+l):r==null?r:""+r)}return t}const C0=Symbol(""),$o=Symbol(""),El=Symbol(""),as=Symbol(""),_a=Symbol("");function Qn(){let e=[];function t(r){return e.push(r),()=>{const l=e.indexOf(r);l>-1&&e.splice(l,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Kt(e,t,n,r,l){const a=r&&(r.enterCallbacks[l]=r.enterCallbacks[l]||[]);return()=>new Promise((s,i)=>{const u=p=>{p===!1?i(Bn(4,{from:n,to:t})):p instanceof Error?i(p):Y2(p)?i(Bn(2,{from:t,to:p})):(a&&r.enterCallbacks[l]===a&&typeof p=="function"&&a.push(p),s())},c=e.call(r&&r.instances[l],t,n,u);let d=Promise.resolve(c);e.length<3&&(d=d.then(u)),d.catch(p=>i(p))})}function Kl(e,t,n,r){const l=[];for(const a of e)for(const s in a.components){let i=a.components[s];if(!(t!=="beforeRouteEnter"&&!a.instances[s]))if(T0(i)){const c=(i.__vccOpts||i)[t];c&&l.push(Kt(c,n,r,a,s))}else{let u=i();l.push(()=>u.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${a.path}"`));const d=M2(c)?c.default:c;a.components[s]=d;const f=(d.__vccOpts||d)[t];return f&&Kt(f,n,r,a,s)()}))}}return l}function T0(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Do(e){const t=me(El),n=me(as),r=x(()=>t.resolve(hn(e.to))),l=x(()=>{const{matched:u}=r.value,{length:c}=u,d=u[c-1],p=n.matched;if(!d||!p.length)return-1;const f=p.findIndex(zn.bind(null,d));if(f>-1)return f;const h=No(u[c-2]);return c>1&&No(d)===h&&p[p.length-1].path!==h?p.findIndex(zn.bind(null,u[c-2])):f}),a=x(()=>l.value>-1&&I0(n.params,r.value.params)),s=x(()=>l.value>-1&&l.value===n.matched.length-1&&kc(n.params,r.value.params));function i(u={}){return A0(u)?t[hn(e.replace)?"replace":"push"](hn(e.to)).catch(ur):Promise.resolve()}return{route:r,href:x(()=>r.value.href),isActive:a,isExactActive:s,navigate:i}}const L0=R({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Do,setup(e,{slots:t}){const n=Tr(Do(e)),{options:r}=me(El),l=x(()=>({[jo(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[jo(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=t.default&&t.default(n);return e.custom?a:o("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:l.value},a)}}}),S0=L0;function A0(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function I0(e,t){for(const n in t){const r=t[n],l=e[n];if(typeof r=="string"){if(r!==l)return!1}else if(!yt(l)||l.length!==r.length||r.some((a,s)=>a!==l[s]))return!1}return!0}function No(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const jo=(e,t,n)=>e??t??n,P0=R({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=me(_a),l=x(()=>e.route||r.value),a=me($o,0),s=x(()=>{let c=hn(a);const{matched:d}=l.value;let p;for(;(p=d[c])&&!p.components;)c++;return c}),i=x(()=>l.value.matched[s.value]);dt($o,x(()=>s.value+1)),dt(C0,i),dt(_a,l);const u=W();return le(()=>[u.value,i.value,e.name],([c,d,p],[f,h,v])=>{d&&(d.instances[p]=c,h&&h!==d&&c&&c===f&&(d.leaveGuards.size||(d.leaveGuards=h.leaveGuards),d.updateGuards.size||(d.updateGuards=h.updateGuards))),c&&d&&(!h||!zn(d,h)||!f)&&(d.enterCallbacks[p]||[]).forEach(w=>w(c))},{flush:"post"}),()=>{const c=l.value,d=e.name,p=i.value,f=p&&p.components[d];if(!f)return Vo(n.default,{Component:f,route:c});const h=p.props[d],v=h?h===!0?c.params:typeof h=="function"?h(c):h:null,_=o(f,ge({},v,t,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(p.instances[d]=null)},ref:u}));return Vo(n.default,{Component:_,route:c})||_}}});function Vo(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const M0=P0;function R0(e){const t=s0(e.routes,e),n=e.parseQuery||k0,r=e.stringifyQuery||Oo,l=e.history,a=Qn(),s=Qn(),i=Qn(),u=Te(Pt);let c=Pt;Tn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Ul.bind(null,T=>""+T),p=Ul.bind(null,_0),f=Ul.bind(null,pl);function h(T,F){let z,Z;return Cc(T)?(z=t.getRecordMatcher(T),Z=F):Z=T,t.addRoute(Z,z)}function v(T){const F=t.getRecordMatcher(T);F&&t.removeRoute(F)}function w(){return t.getRoutes().map(T=>T.record)}function _(T){return!!t.getRecordMatcher(T)}function y(T,F){if(F=ge({},F||u.value),typeof T=="string"){const m=ql(n,T,F.path),k=t.resolve({path:m.path},F),I=l.createHref(m.fullPath);return ge(m,k,{params:f(k.params),hash:pl(m.hash),redirectedFrom:void 0,href:I})}let z;if("path"in T)z=ge({},T,{path:ql(n,T.path,F.path).path});else{const m=ge({},T.params);for(const k in m)m[k]==null&&delete m[k];z=ge({},T,{params:p(m)}),F.params=p(F.params)}const Z=t.resolve(z,F),ce=T.hash||"";Z.params=d(f(Z.params));const xe=$2(r,ge({},T,{hash:b0(ce),path:Z.path})),g=l.createHref(xe);return ge({fullPath:xe,hash:ce,query:r===Oo?E0(T.query):T.query||{}},Z,{redirectedFrom:void 0,href:g})}function S(T){return typeof T=="string"?ql(n,T,u.value.path):ge({},T)}function b(T,F){if(c!==T)return Bn(8,{from:F,to:T})}function C(T){return q(T)}function D(T){return C(ge(S(T),{replace:!0}))}function E(T){const F=T.matched[T.matched.length-1];if(F&&F.redirect){const{redirect:z}=F;let Z=typeof z=="function"?z(T):z;return typeof Z=="string"&&(Z=Z.includes("?")||Z.includes("#")?Z=S(Z):{path:Z},Z.params={}),ge({query:T.query,hash:T.hash,params:"path"in Z?{}:T.params},Z)}}function q(T,F){const z=c=y(T),Z=u.value,ce=T.state,xe=T.force,g=T.replace===!0,m=E(z);if(m)return q(ge(S(m),{state:typeof m=="object"?ge({},ce,m.state):ce,force:xe,replace:g}),F||z);const k=z;k.redirectedFrom=F;let I;return!xe&&D2(r,Z,z)&&(I=Bn(16,{to:k,from:Z}),rt(Z,Z,!0,!1)),(I?Promise.resolve(I):V(k,Z)).catch(L=>At(L)?At(L,2)?L:bt(L):K(L,k,Z)).then(L=>{if(L){if(At(L,2))return q(ge({replace:g},S(L.to),{state:typeof L.to=="object"?ge({},ce,L.to.state):ce,force:xe}),F||k)}else L=H(k,Z,!0,g,ce);return Y(k,Z,L),L})}function N(T,F){const z=b(T,F);return z?Promise.reject(z):Promise.resolve()}function $(T){const F=St.values().next().value;return F&&typeof F.runWithContext=="function"?F.runWithContext(T):T()}function V(T,F){let z;const[Z,ce,xe]=O0(T,F);z=Kl(Z.reverse(),"beforeRouteLeave",T,F);for(const m of Z)m.leaveGuards.forEach(k=>{z.push(Kt(k,T,F))});const g=N.bind(null,T,F);return z.push(g),Oe(z).then(()=>{z=[];for(const m of a.list())z.push(Kt(m,T,F));return z.push(g),Oe(z)}).then(()=>{z=Kl(ce,"beforeRouteUpdate",T,F);for(const m of ce)m.updateGuards.forEach(k=>{z.push(Kt(k,T,F))});return z.push(g),Oe(z)}).then(()=>{z=[];for(const m of xe)if(m.beforeEnter)if(yt(m.beforeEnter))for(const k of m.beforeEnter)z.push(Kt(k,T,F));else z.push(Kt(m.beforeEnter,T,F));return z.push(g),Oe(z)}).then(()=>(T.matched.forEach(m=>m.enterCallbacks={}),z=Kl(xe,"beforeRouteEnter",T,F),z.push(g),Oe(z))).then(()=>{z=[];for(const m of s.list())z.push(Kt(m,T,F));return z.push(g),Oe(z)}).catch(m=>At(m,8)?m:Promise.reject(m))}function Y(T,F,z){i.list().forEach(Z=>$(()=>Z(T,F,z)))}function H(T,F,z,Z,ce){const xe=b(T,F);if(xe)return xe;const g=F===Pt,m=Tn?history.state:{};z&&(Z||g?l.replace(T.fullPath,ge({scroll:g&&m&&m.scroll},ce)):l.push(T.fullPath,ce)),u.value=T,rt(T,F,z,g),bt()}let Q;function Le(){Q||(Q=l.listen((T,F,z)=>{if(!xt.listening)return;const Z=y(T),ce=E(Z);if(ce){q(ge(ce,{replace:!0}),Z).catch(ur);return}c=Z;const xe=u.value;Tn&&G2(To(xe.fullPath,z.delta),kl()),V(Z,xe).catch(g=>At(g,12)?g:At(g,2)?(q(g.to,Z).then(m=>{At(m,20)&&!z.delta&&z.type===xr.pop&&l.go(-1,!1)}).catch(ur),Promise.reject()):(z.delta&&l.go(-z.delta,!1),K(g,Z,xe))).then(g=>{g=g||H(Z,xe,!1),g&&(z.delta&&!At(g,8)?l.go(-z.delta,!1):z.type===xr.pop&&At(g,20)&&l.go(-1,!1)),Y(Z,xe,g)}).catch(ur)}))}let _e=Qn(),U=Qn(),ee;function K(T,F,z){bt(T);const Z=U.list();return Z.length?Z.forEach(ce=>ce(T,F,z)):console.error(T),Promise.reject(T)}function Re(){return ee&&u.value!==Pt?Promise.resolve():new Promise((T,F)=>{_e.add([T,F])})}function bt(T){return ee||(ee=!T,Le(),_e.list().forEach(([F,z])=>T?z(T):F()),_e.reset()),T}function rt(T,F,z,Z){const{scrollBehavior:ce}=e;if(!Tn||!ce)return Promise.resolve();const xe=!z&&W2(To(T.fullPath,0))||(Z||!z)&&history.state&&history.state.scroll||null;return Ot().then(()=>ce(T,F,xe)).then(g=>g&&F2(g)).catch(g=>K(g,T,F))}const De=T=>l.go(T);let Xe;const St=new Set,xt={currentRoute:u,listening:!0,addRoute:h,removeRoute:v,hasRoute:_,getRoutes:w,resolve:y,options:e,push:C,replace:D,go:De,back:()=>De(-1),forward:()=>De(1),beforeEach:a.add,beforeResolve:s.add,afterEach:i.add,onError:U.add,isReady:Re,install(T){const F=this;T.component("RouterLink",S0),T.component("RouterView",M0),T.config.globalProperties.$router=F,Object.defineProperty(T.config.globalProperties,"$route",{enumerable:!0,get:()=>hn(u)}),Tn&&!Xe&&u.value===Pt&&(Xe=!0,C(l.location).catch(ce=>{}));const z={};for(const ce in Pt)Object.defineProperty(z,ce,{get:()=>u.value[ce],enumerable:!0});T.provide(El,F),T.provide(as,Si(z)),T.provide(_a,u);const Z=T.unmount;St.add(T),T.unmount=function(){St.delete(T),St.size<1&&(c=Pt,Q&&Q(),Q=null,u.value=Pt,Xe=!1,ee=!1),Z()}}};function Oe(T){return T.reduce((F,z)=>F.then(()=>$(z)),Promise.resolve())}return xt}function O0(e,t){const n=[],r=[],l=[],a=Math.max(t.matched.length,e.matched.length);for(let s=0;s<a;s++){const i=t.matched[s];i&&(e.matched.find(c=>zn(c,i))?r.push(i):n.push(i));const u=e.matched[s];u&&(t.matched.find(c=>zn(c,u))||l.push(u))}return[n,r,l]}function Dt(){return me(El)}function Ct(){return me(as)}var ss=Symbol(""),Tt=()=>{const e=me(ss);if(!e)throw new Error("useClientData() is called without provider.");return e},$0=()=>Tt().pageComponent,he=()=>Tt().pageData,be=()=>Tt().pageFrontmatter,D0=()=>Tt().pageHead,os=()=>Tt().pageLang,N0=()=>Tt().pageLayout,Lt=()=>Tt().routeLocale,j0=()=>Tt().routes,Rc=()=>Tt().siteData,Kn=()=>Tt().siteLocaleData,V0=Symbol(""),Oc=Te(I2),wr=Te(P2),$c=e=>{const t=C2(e);if(wr.value[t])return t;const n=encodeURI(t);return wr.value[n]?n:Oc.value[t]||t},Zn=e=>{const t=$c(e),n=wr.value[t]??{...wr.value["/404.html"],notFound:!0};return{path:t,notFound:!1,...n}},Cl=R({name:"ClientOnly",setup(e,t){const n=W(!1);return fe(()=>{n.value=!0}),()=>{var r,l;return n.value?(l=(r=t.slots).default)==null?void 0:l.call(r):null}}}),Dc=R({name:"Content",props:{path:{type:String,required:!1,default:""}},setup(e){const t=$0(),n=x(()=>{if(!e.path)return t.value;const r=Zn(e.path);return qi(()=>r.loader().then(({comp:l})=>l))});return()=>o(n.value)}}),Se=e=>tn(e)?e:`/${_c(e)}`,H0=e=>{if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget){const t=e.currentTarget.getAttribute("target");if(t!=null&&t.match(/\b_blank\b/i))return}return e.preventDefault(),!0}},Pe=({active:e=!1,activeClass:t="route-link-active",to:n,...r},{slots:l})=>{var i;const a=Dt(),s=Se($c(n));return o("a",{...r,class:["route-link",{[t]:e}],href:s,onClick:(u={})=>{H0(u)?a.push(n).catch():Promise.resolve()}},(i=l.default)==null?void 0:i.call(l))};Pe.displayName="RouteLink";Pe.props={active:Boolean,activeClass:String,to:String};var z0="Layout",B0="en-US",on=Tr({resolveLayouts:e=>e.reduce((t,n)=>({...t,...n.layouts}),{}),resolvePageHead:(e,t,n)=>{const r=Me(t.description)?t.description:n.description,l=[...Array.isArray(t.head)?t.head:[],...n.head,["title",{},e],["meta",{name:"description",content:r}]];return _2(l)},resolvePageHeadTitle:(e,t)=>[e.title,t.title].filter(n=>!!n).join(" | "),resolvePageLang:(e,t)=>e.lang||t.lang||B0,resolvePageLayout:(e,t)=>{const n=Me(e.frontmatter.layout)?e.frontmatter.layout:z0;return t[n]},resolveRouteLocale:(e,t)=>T2(e,t),resolveSiteLocaleData:(e,t)=>{var n;return{...e,...e.locales[t],head:[...((n=e.locales[t])==null?void 0:n.head)??[],...e.head??[]]}}});const F0={};var nt=(e={})=>e;const nn=e=>{const t=Lt();return x(()=>e[t.value]??{})};var Ge=Uint8Array,An=Uint16Array,G0=Int32Array,Nc=new Ge([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),jc=new Ge([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),W0=new Ge([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Vc=function(e,t){for(var n=new An(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var l=new G0(n[30]),r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)l[a]=a-n[r]<<5|r;return{b:n,r:l}},Hc=Vc(Nc,2),zc=Hc.b,U0=Hc.r;zc[28]=258,U0[258]=28;var q0=Vc(jc,0),K0=q0.b,ka=new An(32768);for(var we=0;we<32768;++we){var zt=(we&43690)>>1|(we&21845)<<1;zt=(zt&52428)>>2|(zt&13107)<<2,zt=(zt&61680)>>4|(zt&3855)<<4,ka[we]=((zt&65280)>>8|(zt&255)<<8)>>1}var pr=function(e,t,n){for(var r=e.length,l=0,a=new An(t);l<r;++l)e[l]&&++a[e[l]-1];var s=new An(t);for(l=1;l<t;++l)s[l]=s[l-1]+a[l-1]<<1;var i;if(n){i=new An(1<<t);var u=15-t;for(l=0;l<r;++l)if(e[l])for(var c=l<<4|e[l],d=t-e[l],p=s[e[l]-1]++<<d,f=p|(1<<d)-1;p<=f;++p)i[ka[p]>>u]=c}else for(i=new An(r),l=0;l<r;++l)e[l]&&(i[l]=ka[s[e[l]-1]++]>>15-e[l]);return i},Pr=new Ge(288);for(var we=0;we<144;++we)Pr[we]=8;for(var we=144;we<256;++we)Pr[we]=9;for(var we=256;we<280;++we)Pr[we]=7;for(var we=280;we<288;++we)Pr[we]=8;var Bc=new Ge(32);for(var we=0;we<32;++we)Bc[we]=5;var Z0=pr(Pr,9,1),Y0=pr(Bc,5,1),Zl=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},gt=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Yl=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},X0=function(e){return(e+7)/8|0},is=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Ge(e.subarray(t,n))},J0=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],st=function(e,t,n){var r=new Error(t||J0[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,st),!n)throw r;return r},Q0=function(e,t,n,r){var l=e.length,a=r?r.length:0;if(!l||t.f&&!t.l)return n||new Ge(0);var s=!n,i=s||t.i!=2,u=t.i;s&&(n=new Ge(l*3));var c=function(ce){var xe=n.length;if(ce>xe){var g=new Ge(Math.max(xe*2,ce));g.set(n),n=g}},d=t.f||0,p=t.p||0,f=t.b||0,h=t.l,v=t.d,w=t.m,_=t.n,y=l*8;do{if(!h){d=gt(e,p,1);var S=gt(e,p+1,3);if(p+=3,S)if(S==1)h=Z0,v=Y0,w=9,_=5;else if(S==2){var E=gt(e,p,31)+257,q=gt(e,p+10,15)+4,N=E+gt(e,p+5,31)+1;p+=14;for(var $=new Ge(N),V=new Ge(19),Y=0;Y<q;++Y)V[W0[Y]]=gt(e,p+Y*3,7);p+=q*3;for(var H=Zl(V),Q=(1<<H)-1,Le=pr(V,H,1),Y=0;Y<N;){var _e=Le[gt(e,p,Q)];p+=_e&15;var b=_e>>4;if(b<16)$[Y++]=b;else{var U=0,ee=0;for(b==16?(ee=3+gt(e,p,3),p+=2,U=$[Y-1]):b==17?(ee=3+gt(e,p,7),p+=3):b==18&&(ee=11+gt(e,p,127),p+=7);ee--;)$[Y++]=U}}var K=$.subarray(0,E),Re=$.subarray(E);w=Zl(K),_=Zl(Re),h=pr(K,w,1),v=pr(Re,_,1)}else st(1);else{var b=X0(p)+4,C=e[b-4]|e[b-3]<<8,D=b+C;if(D>l){u&&st(0);break}i&&c(f+C),n.set(e.subarray(b,D),f),t.b=f+=C,t.p=p=D*8,t.f=d;continue}if(p>y){u&&st(0);break}}i&&c(f+131072);for(var bt=(1<<w)-1,rt=(1<<_)-1,De=p;;De=p){var U=h[Yl(e,p)&bt],Xe=U>>4;if(p+=U&15,p>y){u&&st(0);break}if(U||st(2),Xe<256)n[f++]=Xe;else if(Xe==256){De=p,h=null;break}else{var St=Xe-254;if(Xe>264){var Y=Xe-257,xt=Nc[Y];St=gt(e,p,(1<<xt)-1)+zc[Y],p+=xt}var Oe=v[Yl(e,p)&rt],T=Oe>>4;Oe||st(3),p+=Oe&15;var Re=K0[T];if(T>3){var xt=jc[T];Re+=Yl(e,p)&(1<<xt)-1,p+=xt}if(p>y){u&&st(0);break}i&&c(f+131072);var F=f+St;if(f<Re){var z=a-Re,Z=Math.min(Re,F);for(z+f<0&&st(3);f<Z;++f)n[f]=r[z+f]}for(;f<F;++f)n[f]=n[f-Re]}}t.l=h,t.p=De,t.b=f,t.f=d,h&&(d=1,t.m=w,t.d=v,t.n=_)}while(!d);return f!=n.length&&s?is(n,0,f):n.subarray(0,f)},e3=new Ge(0),t3=function(e,t){return((e[0]&15)!=8||e[0]>>4>7||(e[0]<<8|e[1])%31)&&st(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&st(6,"invalid zlib data: "+(e[1]&32?"need":"unexpected")+" dictionary"),(e[1]>>3&4)+2};function n3(e,t){return Q0(e.subarray(t3(e,t&&t.dictionary),-4),{i:2},t&&t.out,t&&t.dictionary)}var Ho=typeof TextEncoder<"u"&&new TextEncoder,Ea=typeof TextDecoder<"u"&&new TextDecoder,r3=0;try{Ea.decode(e3,{stream:!0}),r3=1}catch{}var l3=function(e){for(var t="",n=0;;){var r=e[n++],l=(r>127)+(r>223)+(r>239);if(n+l>e.length)return{s:t,r:is(e,n-1)};l?l==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):l&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function a3(e,t){if(t){for(var n=new Ge(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Ho)return Ho.encode(e);for(var l=e.length,a=new Ge(e.length+(e.length>>1)),s=0,i=function(d){a[s++]=d},r=0;r<l;++r){if(s+5>a.length){var u=new Ge(s+8+(l-r<<1));u.set(a),a=u}var c=e.charCodeAt(r);c<128||t?i(c):c<2048?(i(192|c>>6),i(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|e.charCodeAt(++r)&1023,i(240|c>>18),i(128|c>>12&63),i(128|c>>6&63),i(128|c&63)):(i(224|c>>12),i(128|c>>6&63),i(128|c&63))}return is(a,0,s)}function s3(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(Ea)return Ea.decode(e);var l=l3(e),a=l.s,n=l.r;return n.length&&st(8),a}}const fl=e=>{const t=atob(e);return s3(n3(a3(t,!0)))},o3=(e,t)=>{var r;const n=(r=(t==null?void 0:t._instance)||bn())==null?void 0:r.appContext.components;return n?e in n||Ze(e)in n||Wn(Ze(e))in n:!1},Fc=e=>typeof e<"u",Xl=e=>typeof e=="number",Ca=Array.isArray,gn=(e,t)=>Me(e)&&e.startsWith(t),i3=(e,t)=>Me(e)&&e.endsWith(t),xn=Object.entries,c3=Object.fromEntries,tt=Object.keys,cs=e=>{if(e){if(typeof e=="number")return new Date(e);const t=Date.parse(e.toString());if(!Number.isNaN(t))return new Date(t)}return null},Tl=e=>gn(e,"/"),ae=({name:e="",color:t="currentColor"},{slots:n})=>{var r;return o("svg",{xmlns:"http://www.w3.org/2000/svg",class:["icon",`${e}-icon`],viewBox:"0 0 1024 1024",fill:t,"aria-label":`${e} icon`},(r=n.default)==null?void 0:r.call(n))};ae.displayName="IconBase";const Ll=({size:e=48,stroke:t=4,wrapper:n=!0,height:r=2*e})=>{const l=o("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:e,preserveAspectRatio:"xMidYMid",viewBox:"25 25 50 50"},[o("animateTransform",{attributeName:"transform",type:"rotate",dur:"2s",keyTimes:"0;1",repeatCount:"indefinite",values:"0;360"}),o("circle",{cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":t,"stroke-linecap":"round"},[o("animate",{attributeName:"stroke-dasharray",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"1,200;90,200;1,200"}),o("animate",{attributeName:"stroke-dashoffset",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"0;-35px;-125px"})])]);return n?o("div",{class:"loading-icon-wrapper",style:`display:flex;align-items:center;justify-content:center;height:${r}px`},l):l};Ll.displayName="LoadingIcon";const Gc=(e,{slots:t})=>{var n;return(n=t.default)==null?void 0:n.call(t)},Wc=()=>o(ae,{name:"github"},()=>o("path",{d:"M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"}));Wc.displayName="GitHubIcon";const Uc=()=>o(ae,{name:"gitlab"},()=>o("path",{d:"M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z"}));Uc.displayName="GitLabIcon";const qc=()=>o(ae,{name:"gitee"},()=>o("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z"}));qc.displayName="GiteeIcon";const Kc=()=>o(ae,{name:"bitbucket"},()=>o("path",{d:"M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z"}));Kc.displayName="BitbucketIcon";const Zc=()=>o(ae,{name:"source"},()=>o("path",{d:"M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z"}));Zc.displayName="SourceIcon";const Et=(e,t)=>{var r;const n=(r=(t==null?void 0:t._instance)||bn())==null?void 0:r.appContext.components;return n?e in n||Ze(e)in n||Wn(Ze(e))in n:!1};function u3(){const e=W(!1);return bn()&&fe(()=>{e.value=!0}),e}function d3(e){return u3(),x(()=>!!e())}const p3=()=>d3(()=>typeof window<"u"&&window.navigator&&"userAgent"in window.navigator),f3=()=>{const e=p3();return x(()=>e.value&&/\b(?:Android|iPhone)/i.test(navigator.userAgent))},h3=e=>[/\((ipad);[-\w),; ]+apple/i,/applecoremedia\/[\w.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some(t=>t.test(e)),g3=e=>[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i].some(t=>t.test(e)),m3=e=>[/(mac os x) ?([\w. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(t=>t.test(e)),Sl=(e,t)=>{let n=1;for(let r=0;r<e.length;r++)n+=e.charCodeAt(r),n+=n<<10,n^=n>>6;return n+=n<<3,n^=n>>11,n%t};let v3=class{constructor(){this.messageElements={};const t="message-container",n=document.getElementById(t);n?this.containerElement=n:(this.containerElement=document.createElement("div"),this.containerElement.id=t,document.body.appendChild(this.containerElement))}pop(t,n=2e3){const r=document.createElement("div"),l=Date.now();return r.className="message move-in",r.innerHTML=t,this.containerElement.appendChild(r),this.messageElements[l]=r,n>0&&setTimeout(()=>{this.close(l)},n),l}close(t){if(t){const n=this.messageElements[t];n.classList.remove("move-in"),n.classList.add("move-out"),n.addEventListener("animationend",()=>{n.remove(),delete this.messageElements[t]})}else tt(this.messageElements).forEach(n=>this.close(Number(n)))}destroy(){document.body.removeChild(this.containerElement)}};const Yc=/#.*$/u,y3=e=>{const t=Yc.exec(e);return t?t[0]:""},zo=e=>decodeURI(e).replace(Yc,"").replace(/\/index\.html$/iu,"/").replace(/\.html$/iu,"").replace(/(README|index)?\.md$/iu,""),Xc=(e,t)=>{if(!Fc(t))return!1;const n=zo(e.path),r=zo(t),l=y3(t);return l?l===e.hash&&(!r||n===r):n===r},b3=e=>tn(e)?e:`https://github.com/${e}`,Jc=e=>!tn(e)||/github\.com/.test(e)?"GitHub":/bitbucket\.org/.test(e)?"Bitbucket":/gitlab\.com/.test(e)?"GitLab":/gitee\.com/.test(e)?"Gitee":null;var x3=e=>Object.prototype.toString.call(e)==="[object Object]",_r=e=>typeof e=="string";const Qc=Array.isArray,Bo=e=>x3(e)&&_r(e.name),kr=(e,t=!1)=>e?Qc(e)?e.map(n=>_r(n)?{name:n}:Bo(n)?n:null).filter(n=>n!==null):_r(e)?[{name:e}]:Bo(e)?[e]:(console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${t?"":"| false"} | undefined\`, but got`,e),[]):[],eu=(e,t)=>{if(e){if(Qc(e)&&e.every(_r))return e;if(_r(e))return[e];console.error(`Expect ${t||"value"} to be \`string[] | string | undefined\`, but got`,e)}return[]},tu=e=>eu(e,"category"),nu=e=>eu(e,"tag");function us(e,t){let n,r,l;const a=W(!0),s=()=>{a.value=!0,l()};le(e,s,{flush:"sync"});const i=typeof t=="function"?t:t.get,u=typeof t=="function"?void 0:t.set,c=Oi((d,p)=>(r=d,l=p,{get(){return a.value&&(n=i(),a.value=!1),r(),n},set(f){u==null||u(f)}}));return Object.isExtensible(c)&&(c.trigger=s),c}function rn(e){return mi()?(t1(e),!0):!1}function qe(e){return typeof e=="function"?e():hn(e)}const Mr=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const w3=Object.prototype.toString,_3=e=>w3.call(e)==="[object Object]",Rt=()=>{},Ta=k3();function k3(){var e,t;return Mr&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(ad|hone|od)/.test(window.navigator.userAgent)||((t=window==null?void 0:window.navigator)==null?void 0:t.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function ds(e,t){function n(...r){return new Promise((l,a)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(l).catch(a)})}return n}const ru=e=>e();function E3(e,t={}){let n,r,l=Rt;const a=i=>{clearTimeout(i),l(),l=Rt};return i=>{const u=qe(e),c=qe(t.maxWait);return n&&a(n),u<=0||c!==void 0&&c<=0?(r&&(a(r),r=null),Promise.resolve(i())):new Promise((d,p)=>{l=t.rejectOnCancel?p:d,c&&!r&&(r=setTimeout(()=>{n&&a(n),r=null,d(i())},c)),n=setTimeout(()=>{r&&a(r),r=null,d(i())},u)})}}function C3(e,t=!0,n=!0,r=!1){let l=0,a,s=!0,i=Rt,u;const c=()=>{a&&(clearTimeout(a),a=void 0,i(),i=Rt)};return p=>{const f=qe(e),h=Date.now()-l,v=()=>u=p();return c(),f<=0?(l=Date.now(),v()):(h>f&&(n||!s)?(l=Date.now(),v()):t&&(u=new Promise((w,_)=>{i=r?_:w,a=setTimeout(()=>{l=Date.now(),s=!0,w(v()),c()},Math.max(0,f-h))})),!n&&!a&&(a=setTimeout(()=>s=!0,f)),s=!1,u)}}function T3(e=ru){const t=W(!0);function n(){t.value=!1}function r(){t.value=!0}const l=(...a)=>{t.value&&e(...a)};return{isActive:en(t),pause:n,resume:r,eventFilter:l}}function L3(e){let t;function n(){return t||(t=e()),t}return n.reset=async()=>{const r=t;t=void 0,r&&await r},n}function S3(e){return e||bn()}function A3(...e){if(e.length!==1)return Un(...e);const t=e[0];return typeof t=="function"?en(Oi(()=>({get:t,set:Rt}))):W(t)}function lu(e,t=200,n={}){return ds(E3(t,n),e)}function I3(e,t=200,n=!1,r=!0,l=!1){return ds(C3(t,n,r,l),e)}function P3(e,t,n={}){const{eventFilter:r=ru,...l}=n;return le(e,ds(r,t),l)}function M3(e,t,n={}){const{eventFilter:r,...l}=n,{eventFilter:a,pause:s,resume:i,isActive:u}=T3(r);return{stop:P3(e,t,{...l,eventFilter:a}),pause:s,resume:i,isActive:u}}function Al(e,t=!0,n){S3()?fe(e,n):t?e():Ot(e)}function R3(e,t,n={}){const{immediate:r=!0}=n,l=W(!1);let a=null;function s(){a&&(clearTimeout(a),a=null)}function i(){l.value=!1,s()}function u(...c){s(),l.value=!0,a=setTimeout(()=>{l.value=!1,a=null,e(...c)},qe(t))}return r&&(l.value=!0,Mr&&u()),rn(i),{isPending:en(l),start:u,stop:i}}function hl(e=!1,t={}){const{truthyValue:n=!0,falsyValue:r=!1}=t,l=He(e),a=W(e);function s(i){if(arguments.length)return a.value=i,a.value;{const u=qe(n);return a.value=a.value===u?qe(r):u,a.value}}return l?s:[a,s]}function Ue(e){var t;const n=qe(e);return(t=n==null?void 0:n.$el)!=null?t:n}const ft=Mr?window:void 0,au=Mr?window.document:void 0,su=Mr?window.navigator:void 0;function Ce(...e){let t,n,r,l;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,l]=e,t=ft):[t,n,r,l]=e,!t)return Rt;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const a=[],s=()=>{a.forEach(d=>d()),a.length=0},i=(d,p,f,h)=>(d.addEventListener(p,f,h),()=>d.removeEventListener(p,f,h)),u=le(()=>[Ue(t),qe(l)],([d,p])=>{if(s(),!d)return;const f=_3(p)?{...p}:p;a.push(...n.flatMap(h=>r.map(v=>i(d,h,v,f))))},{immediate:!0,flush:"post"}),c=()=>{u(),s()};return rn(c),c}let Fo=!1;function O3(e,t,n={}){const{window:r=ft,ignore:l=[],capture:a=!0,detectIframe:s=!1}=n;if(!r)return Rt;Ta&&!Fo&&(Fo=!0,Array.from(r.document.body.children).forEach(f=>f.addEventListener("click",Rt)),r.document.documentElement.addEventListener("click",Rt));let i=!0;const u=f=>l.some(h=>{if(typeof h=="string")return Array.from(r.document.querySelectorAll(h)).some(v=>v===f.target||f.composedPath().includes(v));{const v=Ue(h);return v&&(f.target===v||f.composedPath().includes(v))}}),d=[Ce(r,"click",f=>{const h=Ue(e);if(!(!h||h===f.target||f.composedPath().includes(h))){if(f.detail===0&&(i=!u(f)),!i){i=!0;return}t(f)}},{passive:!0,capture:a}),Ce(r,"pointerdown",f=>{const h=Ue(e);i=!u(f)&&!!(h&&!f.composedPath().includes(h))},{passive:!0}),s&&Ce(r,"blur",f=>{setTimeout(()=>{var h;const v=Ue(e);((h=r.document.activeElement)==null?void 0:h.tagName)==="IFRAME"&&!(v!=null&&v.contains(r.document.activeElement))&&t(f)},0)})].filter(Boolean);return()=>d.forEach(f=>f())}function $3(){const e=W(!1);return bn()&&fe(()=>{e.value=!0}),e}function Yn(e){const t=$3();return x(()=>(t.value,!!e()))}function ou(e,t={}){const{window:n=ft}=t,r=Yn(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let l;const a=W(!1),s=c=>{a.value=c.matches},i=()=>{l&&("removeEventListener"in l?l.removeEventListener("change",s):l.removeListener(s))},u=Bi(()=>{r.value&&(i(),l=n.matchMedia(qe(e)),"addEventListener"in l?l.addEventListener("change",s):l.addListener(s),a.value=l.matches)});return rn(()=>{u(),i(),l=void 0}),a}function Go(e,t={}){const{controls:n=!1,navigator:r=su}=t,l=Yn(()=>r&&"permissions"in r);let a;const s=typeof e=="string"?{name:e}:e,i=W(),u=()=>{a&&(i.value=a.state)},c=L3(async()=>{if(l.value){if(!a)try{a=await r.permissions.query(s),Ce(a,"change",u),u()}catch{i.value="prompt"}return a}});return c(),n?{state:i,isSupported:l,query:c}:i}function D3(e={}){const{navigator:t=su,read:n=!1,source:r,copiedDuring:l=1500,legacy:a=!1}=e,s=Yn(()=>t&&"clipboard"in t),i=Go("clipboard-read"),u=Go("clipboard-write"),c=x(()=>s.value||a),d=W(""),p=W(!1),f=R3(()=>p.value=!1,l);function h(){s.value&&i.value!=="denied"?t.clipboard.readText().then(y=>{d.value=y}):d.value=_()}c.value&&n&&Ce(["copy","cut"],h);async function v(y=qe(r)){c.value&&y!=null&&(s.value&&u.value!=="denied"?await t.clipboard.writeText(y):w(y),d.value=y,p.value=!0,f.start())}function w(y){const S=document.createElement("textarea");S.value=y??"",S.style.position="absolute",S.style.opacity="0",document.body.appendChild(S),S.select(),document.execCommand("copy"),S.remove()}function _(){var y,S,b;return(b=(S=(y=document==null?void 0:document.getSelection)==null?void 0:y.call(document))==null?void 0:S.toString())!=null?b:""}return{isSupported:c,text:d,copied:p,copy:v}}const Zr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Yr="__vueuse_ssr_handlers__",N3=j3();function j3(){return Yr in Zr||(Zr[Yr]=Zr[Yr]||{}),Zr[Yr]}function V3(e,t){return N3[e]||t}function H3(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const z3={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Wo="vueuse-storage";function wn(e,t,n,r={}){var l;const{flush:a="pre",deep:s=!0,listenToStorageChanges:i=!0,writeDefaults:u=!0,mergeDefaults:c=!1,shallow:d,window:p=ft,eventFilter:f,onError:h=$=>{console.error($)},initOnMounted:v}=r,w=(d?Te:W)(typeof t=="function"?t():t);if(!n)try{n=V3("getDefaultStorage",()=>{var $;return($=ft)==null?void 0:$.localStorage})()}catch($){h($)}if(!n)return w;const _=qe(t),y=H3(_),S=(l=r.serializer)!=null?l:z3[y],{pause:b,resume:C}=M3(w,()=>D(w.value),{flush:a,deep:s,eventFilter:f});return p&&i&&Al(()=>{Ce(p,"storage",N),Ce(p,Wo,q),v&&N()}),v||N(),w;function D($){try{if($==null)n.removeItem(e);else{const V=S.write($),Y=n.getItem(e);Y!==V&&(n.setItem(e,V),p&&p.dispatchEvent(new CustomEvent(Wo,{detail:{key:e,oldValue:Y,newValue:V,storageArea:n}})))}}catch(V){h(V)}}function E($){const V=$?$.newValue:n.getItem(e);if(V==null)return u&&_!=null&&n.setItem(e,S.write(_)),_;if(!$&&c){const Y=S.read(V);return typeof c=="function"?c(Y,_):y==="object"&&!Array.isArray(Y)?{..._,...Y}:Y}else return typeof V!="string"?V:S.read(V)}function q($){N($.detail)}function N($){if(!($&&$.storageArea!==n)){if($&&$.key==null){w.value=_;return}if(!($&&$.key!==e)){b();try{($==null?void 0:$.newValue)!==S.write(w.value)&&(w.value=E($))}catch(V){h(V)}finally{$?Ot(C):C()}}}}}function B3(e){return ou("(prefers-color-scheme: dark)",e)}function F3(e,t,n={}){const{window:r=ft,...l}=n;let a;const s=Yn(()=>r&&"MutationObserver"in r),i=()=>{a&&(a.disconnect(),a=void 0)},u=le(()=>Ue(e),p=>{i(),s.value&&r&&p&&(a=new MutationObserver(t),a.observe(p,l))},{immediate:!0}),c=()=>a==null?void 0:a.takeRecords(),d=()=>{i(),u()};return rn(d),{isSupported:s,stop:d,takeRecords:c}}function G3(e,t,n={}){const{window:r=ft,...l}=n;let a;const s=Yn(()=>r&&"ResizeObserver"in r),i=()=>{a&&(a.disconnect(),a=void 0)},u=x(()=>Array.isArray(e)?e.map(p=>Ue(p)):[Ue(e)]),c=le(u,p=>{if(i(),s.value&&r){a=new ResizeObserver(t);for(const f of p)f&&a.observe(f,l)}},{immediate:!0,flush:"post",deep:!0}),d=()=>{i(),c()};return rn(d),{isSupported:s,stop:d}}function W3(e,t={width:0,height:0},n={}){const{window:r=ft,box:l="content-box"}=n,a=x(()=>{var p,f;return(f=(p=Ue(e))==null?void 0:p.namespaceURI)==null?void 0:f.includes("svg")}),s=W(t.width),i=W(t.height),{stop:u}=G3(e,([p])=>{const f=l==="border-box"?p.borderBoxSize:l==="content-box"?p.contentBoxSize:p.devicePixelContentBoxSize;if(r&&a.value){const h=Ue(e);if(h){const v=r.getComputedStyle(h);s.value=Number.parseFloat(v.width),i.value=Number.parseFloat(v.height)}}else if(f){const h=Array.isArray(f)?f:[f];s.value=h.reduce((v,{inlineSize:w})=>v+w,0),i.value=h.reduce((v,{blockSize:w})=>v+w,0)}else s.value=p.contentRect.width,i.value=p.contentRect.height},n);Al(()=>{const p=Ue(e);p&&(s.value="offsetWidth"in p?p.offsetWidth:t.width,i.value="offsetHeight"in p?p.offsetHeight:t.height)});const c=le(()=>Ue(e),p=>{s.value=p?t.width:0,i.value=p?t.height:0});function d(){u(),c()}return{width:s,height:i,stop:d}}const Uo=["fullscreenchange","webkitfullscreenchange","webkitendfullscreen","mozfullscreenchange","MSFullscreenChange"];function ps(e,t={}){const{document:n=au,autoExit:r=!1}=t,l=x(()=>{var y;return(y=Ue(e))!=null?y:n==null?void 0:n.querySelector("html")}),a=W(!1),s=x(()=>["requestFullscreen","webkitRequestFullscreen","webkitEnterFullscreen","webkitEnterFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].find(y=>n&&y in n||l.value&&y in l.value)),i=x(()=>["exitFullscreen","webkitExitFullscreen","webkitExitFullScreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].find(y=>n&&y in n||l.value&&y in l.value)),u=x(()=>["fullScreen","webkitIsFullScreen","webkitDisplayingFullscreen","mozFullScreen","msFullscreenElement"].find(y=>n&&y in n||l.value&&y in l.value)),c=["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"].find(y=>n&&y in n),d=Yn(()=>l.value&&n&&s.value!==void 0&&i.value!==void 0&&u.value!==void 0),p=()=>c?(n==null?void 0:n[c])===l.value:!1,f=()=>{if(u.value){if(n&&n[u.value]!=null)return n[u.value];{const y=l.value;if((y==null?void 0:y[u.value])!=null)return!!y[u.value]}}return!1};async function h(){if(!(!d.value||!a.value)){if(i.value)if((n==null?void 0:n[i.value])!=null)await n[i.value]();else{const y=l.value;(y==null?void 0:y[i.value])!=null&&await y[i.value]()}a.value=!1}}async function v(){if(!d.value||a.value)return;f()&&await h();const y=l.value;s.value&&(y==null?void 0:y[s.value])!=null&&(await y[s.value](),a.value=!0)}async function w(){await(a.value?h():v())}const _=()=>{const y=f();(!y||y&&p())&&(a.value=y)};return Ce(n,Uo,_,!1),Ce(()=>Ue(l),Uo,_,!1),r&&rn(h),{isSupported:d,isFullscreen:a,enter:v,exit:h,toggle:w}}function Jl(e){return typeof Window<"u"&&e instanceof Window?e.document.documentElement:typeof Document<"u"&&e instanceof Document?e.documentElement:e}function T6(e,t,n={}){const{window:r=ft}=n;return wn(e,t,r==null?void 0:r.localStorage,n)}function iu(e){const t=window.getComputedStyle(e);if(t.overflowX==="scroll"||t.overflowY==="scroll"||t.overflowX==="auto"&&e.clientWidth<e.scrollWidth||t.overflowY==="auto"&&e.clientHeight<e.scrollHeight)return!0;{const n=e.parentNode;return!n||n.tagName==="BODY"?!1:iu(n)}}function U3(e){const t=e||window.event,n=t.target;return iu(n)?!1:t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)}const Xr=new WeakMap;function fs(e,t=!1){const n=W(t);let r=null,l;le(A3(e),i=>{const u=Jl(qe(i));if(u){const c=u;Xr.get(c)||Xr.set(c,l),n.value&&(c.style.overflow="hidden")}},{immediate:!0});const a=()=>{const i=Jl(qe(e));!i||n.value||(Ta&&(r=Ce(i,"touchmove",u=>{U3(u)},{passive:!1})),i.style.overflow="hidden",n.value=!0)},s=()=>{var i;const u=Jl(qe(e));!u||!n.value||(Ta&&(r==null||r()),u.style.overflow=(i=Xr.get(u))!=null?i:"",Xr.delete(u),n.value=!1)};return rn(s),x({get(){return n.value},set(i){i?a():s()}})}function cu(e,t,n={}){const{window:r=ft}=n;return wn(e,t,r==null?void 0:r.sessionStorage,n)}let q3=0;function K3(e,t={}){const n=W(!1),{document:r=au,immediate:l=!0,manual:a=!1,id:s=`vueuse_styletag_${++q3}`}=t,i=W(e);let u=()=>{};const c=()=>{if(!r)return;const p=r.getElementById(s)||r.createElement("style");p.isConnected||(p.id=s,t.media&&(p.media=t.media),r.head.appendChild(p)),!n.value&&(u=le(i,f=>{p.textContent=f},{immediate:!0}),n.value=!0)},d=()=>{!r||!n.value||(u(),r.head.removeChild(r.getElementById(s)),n.value=!1)};return l&&!a&&Al(c),a||rn(d),{id:s,css:i,unload:d,load:c,isLoaded:en(n)}}function Z3(e={}){const{window:t=ft,behavior:n="auto"}=e;if(!t)return{x:W(0),y:W(0)};const r=W(t.scrollX),l=W(t.scrollY),a=x({get(){return r.value},set(i){scrollTo({left:i,behavior:n})}}),s=x({get(){return l.value},set(i){scrollTo({top:i,behavior:n})}});return Ce(t,"scroll",()=>{r.value=t.scrollX,l.value=t.scrollY},{capture:!1,passive:!0}),{x:a,y:s}}function Y3(e={}){const{window:t=ft,initialWidth:n=Number.POSITIVE_INFINITY,initialHeight:r=Number.POSITIVE_INFINITY,listenOrientation:l=!0,includeScrollbar:a=!0}=e,s=W(n),i=W(r),u=()=>{t&&(a?(s.value=t.innerWidth,i.value=t.innerHeight):(s.value=t.document.documentElement.clientWidth,i.value=t.document.documentElement.clientHeight))};if(u(),Al(u),Ce("resize",u,{passive:!0}),l){const c=ou("(orientation: portrait)");le(c,()=>u())}return{width:s,height:i}}const uu=({type:e="info",text:t="",vertical:n,color:r},{slots:l})=>{var a;return o("span",{class:["vp-badge",e,{diy:r}],style:{verticalAlign:n??!1,backgroundColor:r??!1}},((a=l.default)==null?void 0:a.call(l))||t)};uu.displayName="Badge";var X3=R({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(e){const t=x(()=>{const r=["font-icon icon"],l=`iconfont icon-${e.icon}`;return r.push(l),r}),n=x(()=>{const r={};return e.color&&(r.color=e.color),e.size&&(r["font-size"]=Number.isNaN(Number(e.size))?e.size:`${e.size}px`),tt(r).length?r:null});return()=>e.icon?o("span",{key:e.icon,class:t.value,style:n.value}):null}});const J3=nt({enhance:({app:e})=>{Et("Badge")||e.component("Badge",uu),Et("FontIcon")||e.component("FontIcon",X3)},setup:()=>{K3(`@import url("//at.alicdn.com/t/c/font_4435976_1qy5vjnto7x.css");
`)},rootComponents:[]}),qo=async(e,t)=>{const{path:n,query:r}=e.currentRoute.value,{scrollBehavior:l}=e.options;e.options.scrollBehavior=void 0,await e.replace({path:n,query:r,hash:t}),e.options.scrollBehavior=l},Q3=({headerLinkSelector:e,headerAnchorSelector:t,delay:n,offset:r=5})=>{const l=Dt();Ce("scroll",lu(()=>{var v,w;const s=Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop);if(Math.abs(s-0)<r){qo(l,"");return}const u=window.innerHeight+s,c=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),d=Math.abs(c-u)<r,p=Array.from(document.querySelectorAll(e)),h=Array.from(document.querySelectorAll(t)).filter(_=>p.some(y=>y.hash===_.hash));for(let _=0;_<h.length;_++){const y=h[_],S=h[_+1],b=s>=(((v=y.parentElement)==null?void 0:v.offsetTop)??0)-r,C=!S||s<(((w=S.parentElement)==null?void 0:w.offsetTop)??0)-r;if(!(b&&C))continue;const E=decodeURIComponent(l.currentRoute.value.hash),q=decodeURIComponent(y.hash);if(E===q)return;if(d){for(let N=_+1;N<h.length;N++)if(E===decodeURIComponent(h[N].hash))return}qo(l,q);return}},n))},ef=".vp-sidebar-link, .toc-link",tf=".header-anchor",nf=200,rf=5,lf=nt({setup(){Q3({headerLinkSelector:ef,headerAnchorSelector:tf,delay:nf,offset:rf})}});let du=e=>Me(e.title)?{title:e.title}:null;const pu=Symbol(""),af=e=>{du=e},sf=()=>me(pu),of=e=>{e.provide(pu,du)};var cf={"/":{title:"目录",empty:"暂无目录"}};const uf=R({name:"Catalog",props:{base:{type:String,default:""},level:{type:Number,default:3},index:Boolean,hideHeading:Boolean},setup(e){const t=sf(),n=nn(cf),r=he(),l=j0(),a=Rc(),i=Te(xn(l.value).map(([c,{meta:d}])=>{const p=t(d);if(!p)return null;const f=c.split("/").length;return{level:i3(c,"/")?f-2:f-1,base:c.replace(/\/[^/]+\/?$/,"/"),path:c,...p}}).filter(c=>qn(c)&&Me(c.title))),u=x(()=>{const c=e.base?k2(xc(e.base)):r.value.path.replace(/\/[^/]+$/,"/"),d=c.split("/").length-2,p=[];return i.value.filter(({level:f,path:h})=>{if(!gn(h,c)||h===c)return!1;if(c==="/"){const v=tt(a.value.locales).filter(w=>w!=="/");if(h==="/404.html"||v.some(w=>gn(h,w)))return!1}return f-d<=e.level}).sort(({title:f,level:h,order:v},{title:w,level:_,order:y})=>{const S=h-_;return S||(Xl(v)?Xl(y)?v>0?y>0?v-y:-1:y<0?v-y:1:v:Xl(y)?y:f.localeCompare(w))}).forEach(f=>{var w;const{base:h,level:v}=f;switch(v-d){case 1:{p.push(f);break}case 2:{const _=p.find(y=>y.path===h);_&&(_.children??(_.children=[])).push(f);break}default:{const _=p.find(y=>y.path===h.replace(/\/[^/]+\/$/,"/"));if(_){const y=(w=_.children)==null?void 0:w.find(S=>S.path===h);y&&(y.children??(y.children=[])).push(f)}}}}),p});return()=>{const c=u.value.some(d=>d.children);return o("div",{class:["vp-catalog-wrapper",{index:e.index}]},[e.hideHeading?null:o("h2",{class:"vp-catalog-main-title"},n.value.title),u.value.length?o(e.index?"ol":"ul",{class:["vp-catalogs",{deep:c}]},u.value.map(({children:d=[],title:p,path:f,content:h})=>{const v=o(Pe,{class:"vp-catalog-title",to:f},()=>h?o(h):p);return o("li",{class:"vp-catalog"},c?[o("h3",{id:p,class:["vp-catalog-child-title",{"has-children":d.length}]},[o("a",{href:`#${p}`,class:"vp-catalog-header-anchor","aria-hidden":!0},"#"),v]),d.length?o(e.index?"ol":"ul",{class:"vp-child-catalogs"},d.map(({children:w=[],content:_,path:y,title:S})=>o("li",{class:"vp-child-catalog"},[o("div",{class:["vp-catalog-sub-title",{"has-children":w.length}]},[o("a",{href:`#${S}`,class:"vp-catalog-header-anchor"},"#"),o(Pe,{class:"vp-catalog-title",to:y},()=>_?o(_):S)]),w.length?o(e.index?"ol":"div",{class:e.index?"vp-sub-catalogs":"vp-sub-catalogs-wrapper"},w.map(({content:b,path:C,title:D})=>e.index?o("li",{class:"vp-sub-catalog"},o(Pe,{to:C},()=>b?o(b):D)):o(Pe,{class:"vp-sub-catalog-link",to:C},()=>b?o(b):D))):null]))):null]:o("div",{class:"vp-catalog-child-title"},v))})):o("p",{class:"vp-empty-catalog"},n.value.empty)])}}}),df=nt({enhance:({app:e})=>{of(e),o3("Catalog",e)||e.component("Catalog",uf)}});var pf={"/":{backToTop:"返回顶部"}};const ff=R({name:"BackToTop",setup(e){const t=be(),n=nn(pf),r=Te(),{height:l}=W3(r),{height:a}=Y3(),{y:s}=Z3(),i=x(()=>t.value.backToTop!==!1&&s.value>100),u=x(()=>s.value/(l.value-a.value)*100);return fe(()=>{r.value=document.body}),()=>o(Qt,{name:"back-to-top"},()=>i.value?o("button",{type:"button",class:"vp-back-to-top-button","aria-label":n.value.backToTop,onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},[o("span",{class:"vp-scroll-progress",role:"progressbar","aria-labelledby":"loadinglabel","aria-valuenow":u.value},o("svg",o("circle",{cx:"50%",cy:"50%",style:{"stroke-dasharray":`calc(${Math.PI*u.value}% - ${4*Math.PI}px) calc(${Math.PI*100}% - ${4*Math.PI}px)`}}))),o("div",{class:"back-to-top-icon"})]):null)}}),hf=nt({rootComponents:[ff]}),gf=o("svg",{class:"external-link-icon",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"},[o("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),fu=R({name:"ExternalLinkIcon",props:{locales:{type:Object,required:!1,default:()=>({})}},setup(e){const t=Lt(),n=x(()=>e.locales[t.value]??{openInNewWindow:"open in new window"});return()=>o("span",[gf,o("span",{class:"external-link-icon-sr-only"},n.value.openInNewWindow)])}});var mf={};const vf=mf,yf=nt({enhance({app:e}){e.component("ExternalLinkIcon",o(fu,{locales:vf}))}});/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */const ue={settings:{minimum:.08,easing:"ease",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,barSelector:'[role="bar"]',parent:"body",template:'<div class="bar" role="bar"></div>'},status:null,set:e=>{const t=ue.isStarted();e=Ql(e,ue.settings.minimum,1),ue.status=e===1?null:e;const n=ue.render(!t),r=n.querySelector(ue.settings.barSelector),l=ue.settings.speed,a=ue.settings.easing;return n.offsetWidth,bf(s=>{Jr(r,{transform:"translate3d("+Ko(e)+"%,0,0)",transition:"all "+l+"ms "+a}),e===1?(Jr(n,{transition:"none",opacity:"1"}),n.offsetWidth,setTimeout(function(){Jr(n,{transition:"all "+l+"ms linear",opacity:"0"}),setTimeout(function(){ue.remove(),s()},l)},l)):setTimeout(()=>s(),l)}),ue},isStarted:()=>typeof ue.status=="number",start:()=>{ue.status||ue.set(0);const e=()=>{setTimeout(()=>{ue.status&&(ue.trickle(),e())},ue.settings.trickleSpeed)};return ue.settings.trickle&&e(),ue},done:e=>!e&&!ue.status?ue:ue.inc(.3+.5*Math.random()).set(1),inc:e=>{let t=ue.status;return t?(typeof e!="number"&&(e=(1-t)*Ql(Math.random()*t,.1,.95)),t=Ql(t+e,0,.994),ue.set(t)):ue.start()},trickle:()=>ue.inc(Math.random()*ue.settings.trickleRate),render:e=>{if(ue.isRendered())return document.getElementById("nprogress");Zo(document.documentElement,"nprogress-busy");const t=document.createElement("div");t.id="nprogress",t.innerHTML=ue.settings.template;const n=t.querySelector(ue.settings.barSelector),r=e?"-100":Ko(ue.status||0),l=document.querySelector(ue.settings.parent);return Jr(n,{transition:"all 0 linear",transform:"translate3d("+r+"%,0,0)"}),l!==document.body&&Zo(l,"nprogress-custom-parent"),l==null||l.appendChild(t),t},remove:()=>{Yo(document.documentElement,"nprogress-busy"),Yo(document.querySelector(ue.settings.parent),"nprogress-custom-parent");const e=document.getElementById("nprogress");e&&xf(e)},isRendered:()=>!!document.getElementById("nprogress")},Ql=(e,t,n)=>e<t?t:e>n?n:e,Ko=e=>(-1+e)*100,bf=function(){const e=[];function t(){const n=e.shift();n&&n(t)}return function(n){e.push(n),e.length===1&&t()}}(),Jr=function(){const e=["Webkit","O","Moz","ms"],t={};function n(s){return s.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(i,u){return u.toUpperCase()})}function r(s){const i=document.body.style;if(s in i)return s;let u=e.length;const c=s.charAt(0).toUpperCase()+s.slice(1);let d;for(;u--;)if(d=e[u]+c,d in i)return d;return s}function l(s){return s=n(s),t[s]??(t[s]=r(s))}function a(s,i,u){i=l(i),s.style[i]=u}return function(s,i){for(const u in i){const c=i[u];c!==void 0&&Object.prototype.hasOwnProperty.call(i,u)&&a(s,u,c)}}}(),hu=(e,t)=>(typeof e=="string"?e:hs(e)).indexOf(" "+t+" ")>=0,Zo=(e,t)=>{const n=hs(e),r=n+t;hu(n,t)||(e.className=r.substring(1))},Yo=(e,t)=>{const n=hs(e);if(!hu(e,t))return;const r=n.replace(" "+t+" "," ");e.className=r.substring(1,r.length-1)},hs=e=>(" "+(e.className||"")+" ").replace(/\s+/gi," "),xf=e=>{e&&e.parentNode&&e.parentNode.removeChild(e)},wf=()=>{fe(()=>{const e=Dt(),t=new Set;t.add(e.currentRoute.value.path),e.beforeEach(n=>{t.has(n.path)||ue.start()}),e.afterEach(n=>{t.add(n.path),ue.done()})})},_f=nt({setup(){wf()}}),kf=JSON.parse('{"encrypt":{"config":{"/blog/schedule.html":["$2a$10$pDXLBHJG5k.sc7wxAqUJBuKsbxcpYVtwVG3UN5F4Axsr0d173DU.u"],"/article/baoyan.html":["$2a$10$a2ErxGE2QJVHv4ovPlNjx.jezAV3yBd2W6dDI5hn41.yOkBECkLSi"]}},"author":{"name":"OYH","email":"19859860010@163.com"},"logo":"/web_logo.jpg","repo":"https://github.com/dream-oyh/dream-oyh.github.io","darkmode":"toggle","fullscreen":false,"docsDir":"src","navbarLayout":{"start":["Brand"],"center":["Links"],"end":["Repo","Outlook","Search"]},"footer":"希望你能在此有所收获","displayFooter":true,"blog":{"intro":"/intro.html","medias":{"BiliBili":"https://space.bilibili.com/1901628168?spm_id_from=333.1007.0.0","GitHub":"https://github.com/dream-oyh","WechatMP":"https://mp.weixin.qq.com/s/1RJsBxf1yf5aGAzjEWKtZg","XiaoHongShu":"https://www.xiaohongshu.com/user/profile/62fd04b7000000001200ff72"},"roundAvatar":true,"timeline":"新的内容正在产出……","articlePerPage":5,"articleInfo":["Date","Category","Tag","ReadingTime"]},"locales":{"/":{"lang":"zh-CN","navbarLocales":{"langName":"简体中文","selectLangAriaLabel":"选择语言"},"metaLocales":{"author":"作者","date":"写作日期","origin":"原创","views":"访问量","category":"分类","tag":"标签","readingTime":"阅读时间","words":"字数","toc":"此页内容","prev":"上一页","next":"下一页","lastUpdated":"上次编辑于","contributors":"贡献者","editLink":"编辑此页","print":"打印"},"blogLocales":{"article":"文章","articleList":"文章列表","category":"分类","tag":"标签","timeline":"时间轴","timelineTitle":"昨日不在","all":"全部","intro":"个人介绍","star":"星标","empty":"$text 为空"},"paginationLocales":{"prev":"上一页","next":"下一页","navigate":"跳转到","action":"前往","errorText":"请输入 1 到 $page 之前的页码！"},"outlookLocales":{"themeColor":"主题色","darkmode":"外观","fullscreen":"全屏"},"encryptLocales":{"iconLabel":"文章已加密","placeholder":"输入密码","remember":"记住密码","errorHint":"请输入正确的密码"},"routeLocales":{"skipToContent":"跳至主要內容","notFoundTitle":"页面不存在","notFoundMsg":["这里什么也没有","我们是怎么来到这儿的？","这 是 四 零 四 !","看起来你访问了一个失效的链接"],"back":"返回上一页","home":"带我回家","openInNewWindow":"Open in new window"},"navbar":[{"text":"编程","icon":"code","link":"/code/"},{"text":"English","icon":"language","link":"/english/"},{"text":"文章","icon":"Article","link":"/article/"},{"text":"资料站","icon":"folder","link":"/credit/"},{"text":"Blog","icon":"vue","link":"/blog/"}],"sidebar":{"/code/":[{"text":"编程","link":"/code/","children":["html.md","markdown.md","python.md"]},{"text":"工具","children":["git.md","vscode.md","latex.md","shell.md","vim.md","Linux.md","github.md"]},{"text":"Python 库","children":["python/pandas.md",{"text":"Pytorch","icon":"pytorch","link":"python/pytorch/1pytorch.md"},"python/Seaborn.md","python/web_crawler.md","python/websocket.md"]},{"text":"锦囊","collapsible":true,"children":["tips/regex.md"]}],"/code/python/pytorch/":[{"text":"Pytorch 学习笔记","icon":"pytorch","children":[{"text":"Pytorch 基础","link":"1pytorch.md"},{"text":"常见的模型源码实现","collapsible":true,"children":["2.1linear_regression.md","2.2FashionMNIST.md","2.3softmax.md","2.4MLP.md"]},{"text":"走进深度学习","link":"3.1Deeplearning_basic.md"},{"text":"卷积神经网络","collapsible":true,"children":["4.1convolutional_nn_basic.md","4.2LeNet.md","4.3AlexNet.md","4.4VGG.md","4.5NiN.md","4.6GoogleNet.md","4.7ResNet.md"]}]}],"/english/":[{"text":"目录","icon":"language","link":""},{"text":"英语视频词汇积累","collapsible":true,"icon":"state","prefix":"video/","children":["1.md","2.md","3.md","4.md","5.md","6.md","7.md","8.md","9.md"]},{"text":"FREE 大学英语阅读写作能力提升课","collapsible":true,"icon":"build","prefix":"free/","children":["1.md","2.md","3.md","4.md","5.md","6.md","7.md","8.md","9.md"]},{"text":"学习强国官方英语资源","collapsible":true,"icon":"Article","prefix":"china/","children":["10.22.md","10.23.md","10.24.md","10.25.md","10.26.md","10.27.md","10.28.md","10.29.md","10.30.md","10.31.md","11.1.md","11.2.md"]}],"/article/":[{"text":"随笔","icon":"pen","children":["article.md","weakness.md"]},{"text":"推荐","icon":"34wujiaoxingpingfenshixin","children":["software.md","web.md","film_recommend.md"]},{"text":"学习路线","icon":"graduate","children":["CSU.md","baoyan.md"]},{"text":"读书笔记","icon":"note","children":["read.md","hamlet.md"]},{"text":"他山之石","icon":"communityfill","link":"external.md"}],"/credit/":[{"text":"学习资料","link":"/credit/"}],"/blog/":[{"text":"关于博客","link":"/blog/"},{"text":"博客日志","link":"log.md"},{"text":"问题列表","link":"vuepress.md"},{"text":"博客日程","link":"schedule.md"},{"text":"博客常用站点跳转","link":"spots.md"}]}}}}'),Ef=W(kf),gu=()=>Ef,mu=Symbol(""),Cf=()=>{const e=me(mu);if(!e)throw new Error("useThemeLocaleData() is called without provider.");return e},Tf=(e,t)=>{const{locales:n,...r}=e;return{...r,...n==null?void 0:n[t]}},Lf=nt({enhance({app:e}){const t=gu(),n=e._context.provides[ss],r=x(()=>Tf(t.value,n.routeLocale.value));e.provide(mu,r),Object.defineProperties(e.config.globalProperties,{$theme:{get(){return t.value}},$themeLocale:{get(){return r.value}}})}});var Sf={provider:"Giscus",lightTheme:"https://unpkg.com/vuepress-theme-hope@2.0.0-rc.23/templates/giscus/light.css",darkTheme:"https://unpkg.com/vuepress-theme-hope@2.0.0-rc.23/templates/giscus/dark.css",repo:"dream-oyh/Blog_comments_with_Giscus",repoId:"R_kgDOLSurkg",category:"Announcements",categoryId:"DIC_kwDOLSurks4CdPJJ"};const Af=Sf;let If=Af;const vu=Symbol(""),yu=()=>me(vu),Pf=yu,Mf=e=>{e.provide(vu,If)},Xo=["ar","ca","de","en","eo","es","fa","fr","he","id","it","ja","ko","nl","pl","pt","ro","ru","th","tr","uk","vi","zh-CN","zh-TW"];var Rf=R({name:"GiscusComment",props:{identifier:{type:String,required:!0},darkmode:Boolean},setup(e){const t=Pf(),n=os(),r=!!(t.repo&&t.repoId&&t.category&&t.categoryId),{repo:l,repoId:a,category:s,categoryId:i}=t,u=W(!1),c=x(()=>{if(Xo.includes(n.value))return n.value;const p=n.value.split("-")[0];return Xo.includes(p)?p:"en"}),d=x(()=>({repo:l,repoId:a,category:s,categoryId:i,lang:c.value,theme:e.darkmode?t.darkTheme||"dark":t.lightTheme||"light",mapping:t.mapping||"pathname",term:e.identifier,inputPosition:t.inputPosition||"top",reactionsEnabled:t.reactionsEnabled===!1?"0":"1",strict:t.strict===!1?"0":"1",loading:t.lazyLoading===!1?"eager":"lazy",emitMetadata:"0"}));return fe(async()=>{await A(()=>import("./giscus-7BMGhbDA.js"),__vite__mapDeps([])),u.value=!0}),()=>r?o("div",{id:"comment",class:["giscus-wrapper",{"input-top":t.inputPosition!=="bottom"}]},u.value?o("giscus-widget",d.value):o(Ll)):null}}),Of=R({name:"CommentService",props:{darkmode:Boolean},setup(e){const t=yu(),n=he(),r=be(),l=t.comment!==!1,a=x(()=>r.value.comment||l&&r.value.comment!==!1);return()=>o(Rf,{identifier:r.value.commentID||n.value.path,darkmode:e.darkmode,style:{display:a.value?"block":"none"}})}}),$f=nt({enhance:({app:e})=>{Mf(e),e.component("CommentService",Of)}});const Df=/\b(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i,Nf=()=>typeof window<"u"&&window.navigator&&"userAgent"in window.navigator&&Df.test(navigator.userAgent),ea=new Map,jf=({delay:e=500,duration:t=2e3,locales:n,selector:r,showInMobile:l})=>{const{copy:a}=D3({legacy:!0}),s=nn(n),i=he(),u=p=>{if(!p.hasAttribute("copy-code-registered")){const f=document.createElement("button");f.type="button",f.classList.add("vp-copy-code-button"),f.innerHTML='<div class="vp-copy-icon" />',f.setAttribute("aria-label",s.value.copy),f.setAttribute("data-copied",s.value.copied),p.parentElement&&p.parentElement.insertBefore(f,p),p.setAttribute("copy-code-registered","")}},c=()=>{Ot().then(()=>setTimeout(()=>{r.forEach(p=>{document.querySelectorAll(p).forEach(u)})},e))},d=(p,f,h)=>{let{innerText:v=""}=f;/language-(shellscript|shell|bash|sh|zsh)/.test(p.classList.toString())&&(v=v.replace(/^ *(\$|>) /gm,"")),a(v).then(()=>{h.classList.add("copied"),clearTimeout(ea.get(h));const w=setTimeout(()=>{h.classList.remove("copied"),h.blur(),ea.delete(h)},t);ea.set(h,w)})};fe(()=>{const p=!Nf()||l;p&&c(),Ce("click",f=>{const h=f.target;if(h.matches('div[class*="language-"] > button.copy')){const v=h.parentElement,w=h.nextElementSibling;w&&d(v,w,h)}else if(h.matches('div[class*="language-"] div.vp-copy-icon')){const v=h.parentElement,w=v.parentElement,_=v.nextElementSibling;_&&d(w,_,v)}}),le(()=>i.value.path,()=>{p&&c()})})};var Vf={"/":{copy:"复制代码",copied:"已复制"}},Hf=['.theme-hope-content div[class*="language-"] pre'];const zf=500,Bf=2e3,Ff=Vf,Gf=Hf,Wf=!1,Uf=nt({setup:()=>{jf({selector:Gf,locales:Ff,duration:Bf,delay:zf,showInMobile:Wf})}}),Qr=wn("VUEPRESS_CODE_TAB_STORE",{});var qf=R({name:"CodeTabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const n=W(e.active),r=Te([]),l=()=>{e.tabId&&(Qr.value[e.tabId]=e.data[n.value].id)},a=(c=n.value)=>{n.value=c<r.value.length-1?c+1:0,r.value[n.value].focus()},s=(c=n.value)=>{n.value=c>0?c-1:r.value.length-1,r.value[n.value].focus()},i=(c,d)=>{c.key===" "||c.key==="Enter"?(c.preventDefault(),n.value=d):c.key==="ArrowRight"?(c.preventDefault(),a()):c.key==="ArrowLeft"&&(c.preventDefault(),s()),e.tabId&&(Qr.value[e.tabId]=e.data[n.value].id)},u=()=>{if(e.tabId){const c=e.data.findIndex(({id:d})=>Qr.value[e.tabId]===d);if(c!==-1)return c}return e.active};return fe(()=>{n.value=u(),le(()=>Qr.value[e.tabId],(c,d)=>{if(e.tabId&&c!==d){const p=e.data.findIndex(({id:f})=>f===c);p!==-1&&(n.value=p)}})}),()=>e.data.length?o("div",{class:"vp-code-tabs"},[o("div",{class:"vp-code-tabs-nav",role:"tablist"},e.data.map(({id:c},d)=>{const p=d===n.value;return o("button",{type:"button",ref:f=>{f&&(r.value[d]=f)},class:["vp-code-tab-nav",{active:p}],role:"tab","aria-controls":`codetab-${e.id}-${d}`,"aria-selected":p,onClick:()=>{n.value=d,l()},onKeydown:f=>i(f,d)},t[`title${d}`]({value:c,isActive:p}))})),e.data.map(({id:c},d)=>{const p=d===n.value;return o("div",{class:["vp-code-tab",{active:p}],id:`codetab-${e.id}-${d}`,role:"tabpanel","aria-expanded":p},[o("div",{class:"vp-code-tab-title"},t[`title${d}`]({value:c,isActive:p})),t[`tab${d}`]({value:c,isActive:p})])})]):null}});const bu=({active:e=!1},{slots:t})=>{var n;return o("div",{class:["code-group-item",{active:e}],"aria-selected":e},(n=t.default)==null?void 0:n.call(t))};bu.displayName="CodeGroupItem";const Kf=R({name:"CodeGroup",slots:Object,setup(e,{slots:t}){const n=W(-1),r=Te([]),l=(i=n.value)=>{n.value=i<r.value.length-1?i+1:0,r.value[n.value].focus()},a=(i=n.value)=>{n.value=i>0?i-1:r.value.length-1,r.value[n.value].focus()},s=(i,u)=>{i.key===" "||i.key==="Enter"?(i.preventDefault(),n.value=u):i.key==="ArrowRight"?(i.preventDefault(),l(u)):i.key==="ArrowLeft"&&(i.preventDefault(),a(u))};return()=>{var u;const i=(((u=t.default)==null?void 0:u.call(t))||[]).filter(c=>c.type.name==="CodeGroupItem").map(c=>(c.props===null&&(c.props={}),c));return i.length===0?null:(n.value<0||n.value>i.length-1?(n.value=i.findIndex(c=>"active"in c.props),n.value===-1&&(n.value=0)):i.forEach((c,d)=>{c.props.active=d===n.value}),o("div",{class:"code-group"},[o("div",{class:"code-group-nav"},i.map((c,d)=>{const p=d===n.value;return o("button",{type:"button",ref:f=>{f&&(r.value[d]=f)},class:["code-group-nav-tab",{active:p}],"aria-pressed":p,"aria-expanded":p,onClick:()=>{n.value=d},onKeydown:f=>s(f,d)},c.props.title)})),i]))}}}),Zf='<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>',Yf='<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>';var Xf={useBabel:!1,jsLib:[],cssLib:[],codepenLayout:"left",codepenEditors:"101",babel:"https://unpkg.com/@babel/standalone/babel.min.js",vue:"https://unpkg.com/vue/dist/vue.global.prod.js",react:"https://unpkg.com/react/umd/react.production.min.js",reactDOM:"https://unpkg.com/react-dom/umd/react-dom.production.min.js"};const ta=Xf,Jo={html:{types:["html","slim","haml","md","markdown","vue"],map:{html:"none",vue:"none",md:"markdown"}},js:{types:["js","javascript","coffee","coffeescript","ts","typescript","ls","livescript"],map:{js:"none",javascript:"none",coffee:"coffeescript",ls:"livescript",ts:"typescript"}},css:{types:["css","less","sass","scss","stylus","styl"],map:{css:"none",styl:"stylus"}}},Jf=(e,t,n)=>{const r=document.createElement(e);return qn(t)&&tt(t).forEach(l=>{if(l.indexOf("data"))r[l]=t[l];else{const a=l.replace("data","");r.dataset[a]=t[l]}}),n&&n.forEach(l=>{r.appendChild(l)}),r},gs=e=>({...ta,...e,jsLib:Array.from(new Set([...ta.jsLib||[],...e.jsLib||[]])),cssLib:Array.from(new Set([...ta.cssLib||[],...e.cssLib||[]]))}),On=(e,t)=>{if(Fc(e[t]))return e[t];const n=new Promise(r=>{var a;const l=document.createElement("script");l.src=t,(a=document.querySelector("body"))==null||a.appendChild(l),l.onload=()=>{r()}});return e[t]=n,n},Qf=(e,t)=>{if(t.css&&Array.from(e.childNodes).every(n=>n.nodeName!=="STYLE")){const n=Jf("style",{innerHTML:t.css});e.appendChild(n)}},eh=(e,t,n)=>{const r=n.getScript();if(r&&Array.from(t.childNodes).every(l=>l.nodeName!=="SCRIPT")){const l=document.createElement("script");l.appendChild(document.createTextNode(`{const document=window.document.querySelector('#${e} .vp-code-demo-display').shadowRoot;
${r}}`)),t.appendChild(l)}},th=e=>{const t=tt(e),n={html:[],js:[],css:[],isLegal:!1};return["html","js","css"].forEach(r=>{const l=t.filter(a=>Jo[r].types.includes(a));if(l.length){const a=l[0];n[r]=[e[a].replace(/^\n|\n$/g,""),Jo[r].map[a]||a]}}),n.isLegal=(!n.html.length||n.html[1]==="none")&&(!n.js.length||n.js[1]==="none")&&(!n.css.length||n.css[1]==="none"),n},xu=e=>e.replace(/<br \/>/g,"<br>").replace(/<((\S+)[^<]*?)\s+\/>/g,"<$1></$2>"),wu=e=>`<div id="app">
${xu(e)}
</div>`,nh=e=>`${e.replace("export default ","const $reactApp = ").replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,"")};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`,rh=e=>e.replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,"Vue.createApp({$1}).mount('#app')").replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,"Vue.createApp({$1}).mount('#app')").trim(),_u=e=>`(function(exports){var module={};module.exports=exports;${e};return module.exports.__esModule?module.exports.default:module.exports;})({})`,lh=(e,t)=>{const n=gs(t),r=e.js[0]||"";return{...n,html:xu(e.html[0]||""),js:r,css:e.css[0]||"",isLegal:e.isLegal,getScript:()=>{var l;return n.useBabel?((l=window.Babel.transform(r,{presets:["es2015"]}))==null?void 0:l.code)||"":r}}},ah=/<template>([\s\S]+)<\/template>/u,sh=/<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u,oh=/<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u,ih=(e,t)=>{const n=gs(t),r=e.html[0]||"",l=ah.exec(r),a=sh.exec(r),s=oh.exec(r),i=l?l[1].replace(/^\n|\n$/g,""):"",[u="",c=""]=a?[a[4].replace(/^\n|\n$/g,""),a[3]]:[],[d="",p=""]=s?[s[4].replace(/^\n|\n$/g,""),s[3]]:[],f=c===""&&(p===""||p==="css");return{...n,html:wu(i),js:rh(u),css:d,isLegal:f,jsLib:[n.vue,...n.jsLib],getScript:()=>{var v,w;const h=t.useBabel?((w=(v=window.Babel)==null?void 0:v.transform(u,{presets:["es2015"]}))==null?void 0:w.code)||"":u.replace(/export\s+default/u,"return");return`const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${_u(h)};appOptions.template=\`${i.replace("`",'\\`"')}\`;window.Vue.createApp(appOptions).mount(app);`}}},ch=(e,t)=>{const n=gs(t);return{...n,html:wu(""),js:nh(e.js[0]||""),css:e.css[0]||(e.js[0]?e.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/,"$1").trim():""),isLegal:e.isLegal,jsLib:[n.react,n.reactDOM,...n.jsLib],jsx:!0,getScript:()=>{var l,a;const r=((a=(l=window.Babel)==null?void 0:l.transform(e.js[0]||"",{presets:["es2015","react"]}))==null?void 0:a.code)||"";return`window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${_u(r)}))`}}},$n={},uh=e=>Promise.all([On($n,e.babel),On($n,e.react),On($n,e.reactDOM)]),dh=e=>{const t=[On($n,e.vue)];return e.useBabel&&t.push(On($n,e.babel)),Promise.all(t)},ph=e=>e.useBabel?On($n,e.babel):Promise.resolve();var fh=R({name:"CodeDemo",props:{id:{type:String,required:!0},type:{type:String,default:"normal"},title:{type:String,default:""},config:{type:String,default:""},code:{type:String,required:!0}},slots:Object,setup(e,{slots:t}){const[n,r]=hl(!1),l=Te(),a=Te(),s=W("0"),i=W(!1),u=x(()=>JSON.parse(e.config?fl(e.config):"{}")),c=x(()=>{const v=JSON.parse(fl(e.code));return th(v)}),d=x(()=>e.type==="react"?ch(c.value,u.value):e.type==="vue"?ih(c.value,u.value):lh(c.value,u.value)),p=x(()=>d.value.isLegal),f=(v=!1)=>{const w=l.value.attachShadow({mode:"open"}),_=document.createElement("div");_.classList.add("code-demo-app"),w.appendChild(_),p.value?(v&&(_.innerHTML=d.value.html),Qf(w,d.value),eh(e.id,w,d.value),s.value="0"):s.value="auto",i.value=!0},h=()=>{switch(e.type){case"react":return uh(d.value).then(()=>f());case"vue":return dh(d.value).then(()=>f());default:return ph(d.value).then(()=>f(!0))}};return Ce("beforeprint",()=>{r(!0)}),fe(()=>{setTimeout(()=>{h()},800)}),()=>{var v;return o("div",{class:"vp-code-demo",id:e.id},[o("div",{class:"vp-code-demo-header"},[d.value.isLegal?o("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-code-demo-toggle-button",n.value?"down":"end"],onClick:()=>{s.value=n.value?"0":`${a.value.clientHeight+13.8}px`,r()}}):null,e.title?o("span",{class:"vp-code-demo-title"},decodeURIComponent(e.title)):null,d.value.isLegal&&d.value.jsfiddle!==!1?o("form",{class:"code-demo-jsfiddle",target:"_blank",action:"https://jsfiddle.net/api/post/library/pure/",method:"post"},[o("input",{type:"hidden",name:"html",value:d.value.html}),o("input",{type:"hidden",name:"js",value:d.value.js}),o("input",{type:"hidden",name:"css",value:d.value.css}),o("input",{type:"hidden",name:"wrap",value:"1"}),o("input",{type:"hidden",name:"panel_js",value:"3"}),o("input",{type:"hidden",name:"resources",value:[...d.value.cssLib,...d.value.jsLib].join(",")}),o("button",{type:"submit",class:"jsfiddle-button",innerHTML:Yf,"aria-label":"JSFiddle","data-balloon-pos":"up"})]):null,!d.value.isLegal||d.value.codepen!==!1?o("form",{class:"code-demo-codepen",target:"_blank",action:"https://codepen.io/pen/define",method:"post"},[o("input",{type:"hidden",name:"data",value:JSON.stringify({html:d.value.html,js:d.value.js,css:d.value.css,js_external:d.value.jsLib.join(";"),css_external:d.value.cssLib.join(";"),layout:d.value.codepenLayout,html_pre_processor:c.value?c.value.html[1]:"none",js_pre_processor:c.value?c.value.js[1]:d.value.jsx?"babel":"none",css_pre_processor:c.value?c.value.css[1]:"none",editors:d.value.codepenEditors})}),o("button",{type:"submit",innerHTML:Zf,class:"codepen-button","aria-label":"Codepen","data-balloon-pos":"up"})]):null]),i.value?null:o(Ll,{class:"vp-code-demo-loading"}),o("div",{ref:l,class:"vp-code-demo-display",style:{display:p.value&&i.value?"block":"none"}}),o("div",{class:"vp-code-demo-code-wrapper",style:{height:s.value}},o("div",{ref:a,class:"vp-code-demo-codes"},(v=t.default)==null?void 0:v.call(t)))])}}}),hh=R({name:"MdDemo",props:{id:{type:String,required:!0},title:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const[n,r]=hl(!1),l=Te(),a=W("0");return Ce("beforeprint",()=>{r(!0)}),()=>{var s,i;return o("div",{class:"vp-md-demo",id:e.id},[o("div",{class:"vp-md-demo-header"},[o("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-md-demo-toggle-button",n.value?"down":"end"],onClick:()=>{a.value=n.value?"0":`${l.value.clientHeight+13.8}px`,r()}}),e.title?decodeURIComponent(e.title):null]),o("div",{class:"vp-md-demo-display"},(s=t.default)==null?void 0:s.call(t)),o("div",{class:"vp-md-demo-code-wrapper",style:{height:a.value}},o("div",{ref:l,class:"vp-md-demo-codes"},(i=t.code)==null?void 0:i.call(t)))])}}});const gh=()=>{Ce("beforeprint",()=>{document.querySelectorAll("details").forEach(e=>{e.open=!0})})};let mh={};const ku=Symbol(""),vh=()=>me(ku),yh=e=>{e.provide(ku,mh)},Qo=()=>{const e=document.documentElement;return e.classList.contains("dark")||e.getAttribute("data-theme")==="dark"},En={useMaxWidth:!1},bh=e=>({dark:e,background:e?"#1e1e1e":"#fff",primaryColor:e?"#389d70":"#4abf8a",primaryBorderColor:e?"#389d70":"#4abf8a",primaryTextColor:e?"#fff":"#000",secondaryColor:"#ffb500",secondaryBorderColor:e?"#fff":"#000",secondaryTextColor:e?"#ddd":"#333",tertiaryColor:e?"#282828":"#efeef4",tertiaryBorderColor:e?"#bbb":"#242424",tertiaryTextColor:e?"#ddd":"#333",noteBkgColor:e?"#f6d365":"#fff5ad",noteTextColor:"#242424",noteBorderColor:e?"#f6d365":"#333",lineColor:e?"#d3d3d3":"#333",textColor:e?"#fff":"#242424",mainBkg:e?"#389d70":"#4abf8a",errorBkgColor:"#eb4d5d",errorTextColor:"#fff",nodeBorder:e?"#389d70":"#4abf8a",nodeTextColor:e?"#fff":"#242424",signalTextColor:e?"#9e9e9e":"#242424",classText:"#fff",labelColor:"#fff",attributeBackgroundColorEven:e?"#0d1117":"#fff",attributeBackgroundColorOdd:e?"#161b22":"#f8f8f8",fillType0:e?"#cf1322":"#f1636e",fillType1:"#f39c12",fillType2:"#2ecc71",fillType3:"#fa541c",fillType4:"#25a55b",fillType5:"#13c2c2",fillType6:"#096dd9",fillType7:"#aa6fe9"});var xh=R({name:"Mermaid",props:{id:{type:String,required:!0},code:{type:String,required:!0},title:{type:String,default:""}},setup(e){const{themeVariables:t,...n}=vh(),r=Te(),l=x(()=>fl(e.code)),a=W(""),s=W(!1);let i=!1;const u=async()=>{const[{default:p}]=await Promise.all([A(()=>import("./mermaid.core-CuBxfRSw.js").then(f=>f.b6),__vite__mapDeps([])),i?Promise.resolve():(i=!0,new Promise(f=>setTimeout(f,800)))]);p.initialize({theme:"base",themeVariables:{...bh(s.value),...L2(t)?t(s.value):t},flowchart:En,sequence:En,journey:En,gantt:En,er:En,pie:En,...n,startOnLoad:!1}),a.value=(await p.render(e.id,l.value)).svg},c=()=>{const{body:p}=document,f=document.createElement("div");f.classList.add("mermaid-preview"),f.innerHTML=a.value,p.appendChild(f),f.addEventListener("click",()=>{p.removeChild(f)})},d=()=>{const p=`data:image/svg+xml;charset=utf8,${a.value.replace(/<br>/g,"<br />").replace(/%/g,"%25").replace(/"/g,"%22").replace(/'/g,"%27").replace(/&/g,"%26").replace(/#/g,"%23").replace(/{/g,"%7B").replace(/}/g,"%7D").replace(/</g,"%3C").replace(/>/g,"%3E")}`,f=document.createElement("a");f.setAttribute("href",p),f.setAttribute("download",`${e.title?fl(e.title):e.id}.svg`),f.click()};return fe(()=>{s.value=Qo(),u(),F3(document.documentElement,()=>{s.value=Qo()},{attributeFilter:["class","data-theme"],attributes:!0}),le(s,()=>u())}),()=>[o("div",{class:"mermaid-actions"},[o("button",{class:"preview-button",onClick:()=>c(),title:"preview",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor"><path d="M658.286 0C415.89 0 0 297.106 0 512c0 214.82 415.89 512 658.286 512 242.322 0 658.285-294.839 658.285-512S900.608 0 658.286 0zm0 877.714c-161.573 0-512-221.769-512-365.714 0-144.018 350.427-365.714 512-365.714 161.572 0 512 217.16 512 365.714s-350.428 365.714-512 365.714z"/><path d="M658.286 292.571a219.429 219.429 0 1 0 0 438.858 219.429 219.429 0 0 0 0-438.858zm0 292.572a73.143 73.143 0 1 1 0-146.286 73.143 73.143 0 0 1 0 146.286z"/></svg>'}),o("button",{class:"download-button",onClick:()=>d(),title:"download",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M828.976 894.125H190.189c-70.55 0-127.754-57.185-127.754-127.753V606.674c0-17.634 14.31-31.933 31.933-31.933h63.889c17.634 0 31.932 14.299 31.932 31.933v95.822c0 35.282 28.596 63.877 63.877 63.877h511.033c35.281 0 63.877-28.595 63.877-63.877v-95.822c0-17.634 14.298-31.933 31.943-31.933h63.878c17.635 0 31.933 14.299 31.933 31.933v159.7c0 70.566-57.191 127.751-127.754 127.751zM249.939 267.51c12.921-12.92 33.885-12.92 46.807 0l148.97 148.972V94.893c0-17.634 14.302-31.947 31.934-31.947h63.876c17.638 0 31.946 14.313 31.946 31.947v321.589l148.97-148.972c12.922-12.92 33.876-12.92 46.797 0l46.814 46.818c12.922 12.922 12.922 33.874 0 46.807L552.261 624.93c-1.14 1.138-21.664 13.684-42.315 13.693-20.877.01-41.88-12.542-43.021-13.693L203.122 361.135c-12.923-12.934-12.923-33.885 0-46.807l46.817-46.818z"/></svg>'})]),o("div",{ref:r,class:"mermaid-wrapper"},a.value?o("div",{class:"mermaid-content",innerHTML:a.value}):o(Ll,{class:"mermaid-loading",height:96}))]}});const na=wn("VUEPRESS_TAB_STORE",{});var wh=R({name:"Tabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(e,{slots:t}){const n=W(e.active),r=Te([]),l=()=>{e.tabId&&(na.value[e.tabId]=e.data[n.value].id)},a=(c=n.value)=>{n.value=c<r.value.length-1?c+1:0,r.value[n.value].focus()},s=(c=n.value)=>{n.value=c>0?c-1:r.value.length-1,r.value[n.value].focus()},i=(c,d)=>{c.key===" "||c.key==="Enter"?(c.preventDefault(),n.value=d):c.key==="ArrowRight"?(c.preventDefault(),a()):c.key==="ArrowLeft"&&(c.preventDefault(),s()),l()},u=()=>{if(e.tabId){const c=e.data.findIndex(({id:d})=>na.value[e.tabId]===d);if(c!==-1)return c}return e.active};return fe(()=>{n.value=u(),le(()=>na.value[e.tabId],(c,d)=>{if(e.tabId&&c!==d){const p=e.data.findIndex(({id:f})=>f===c);p!==-1&&(n.value=p)}})}),()=>e.data.length?o("div",{class:"vp-tabs"},[o("div",{class:"vp-tabs-nav",role:"tablist"},e.data.map(({id:c},d)=>{const p=d===n.value;return o("button",{type:"button",ref:f=>{f&&(r.value[d]=f)},class:["vp-tab-nav",{active:p}],role:"tab","aria-controls":`tab-${e.id}-${d}`,"aria-selected":p,onClick:()=>{n.value=d,l()},onKeydown:f=>i(f,d)},t[`title${d}`]({value:c,isActive:p}))})),e.data.map(({id:c},d)=>{const p=d===n.value;return o("div",{class:["vp-tab",{active:p}],id:`tab-${e.id}-${d}`,role:"tabpanel","aria-expanded":p},[o("div",{class:"vp-tab-title"},t[`title${d}`]({value:c,isActive:p})),t[`tab${d}`]({value:c,isActive:p})])})]):null}});const _h=nt({enhance:({app:e})=>{e.component("CodeTabs",qf),Et("CodeGroup",e)||e.component("CodeGroup",Kf),Et("CodeGroupItem",e)||e.component("CodeGroupItem",bu),e.component("CodeDemo",fh),e.component("MdDemo",hh),yh(e),e.component("Mermaid",xh),e.component("Tabs",wh)},setup:()=>{gh()}});let kh={};const Eu=Symbol(""),Eh=()=>me(Eu),Ch=e=>{e.provide(Eu,kh)},Th='<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>',Lh=e=>Me(e)?Array.from(document.querySelectorAll(e)):e.map(t=>Array.from(document.querySelectorAll(t))).flat(),Cu=e=>new Promise((t,n)=>{e.complete?t({type:"image",element:e,src:e.src,width:e.naturalWidth,height:e.naturalHeight,alt:e.alt,msrc:e.src}):(e.onload=()=>t(Cu(e)),e.onerror=r=>n(r))}),Sh=e=>{const{isSupported:t,toggle:n}=ps();e.on("uiRegister",()=>{t.value&&e.ui.registerElement({name:"fullscreen",order:7,isButton:!0,html:'<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',onClick:()=>{n()}}),e.ui.registerElement({name:"download",order:8,isButton:!0,tagName:"a",html:{isCustomSVG:!0,inner:'<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',outlineID:"pswp__icn-download"},onInit:(r,l)=>{r.setAttribute("download",""),r.setAttribute("target","_blank"),r.setAttribute("rel","noopener"),l.on("change",()=>{r.setAttribute("href",l.currSlide.data.src)})}}),e.ui.registerElement({name:"bulletsIndicator",className:"photo-swipe-bullets-indicator",appendTo:"wrapper",onInit:(r,l)=>{const a=[];let s=-1;for(let i=0;i<l.getNumItems();i++){const u=document.createElement("div");u.className="photo-swipe-bullet",u.onclick=c=>{l.goTo(a.indexOf(c.target))},a.push(u),r.appendChild(u)}l.on("change",()=>{s>=0&&a[s].classList.remove("active"),a[l.currIndex].classList.add("active"),s=l.currIndex})}})})},Ah=(e,t,n=!0)=>A(()=>import("./photoswipe.esm-SzV8tJDW.js"),__vite__mapDeps([])).then(({default:r})=>{let l=null;const a=e.map(s=>({html:Th,element:s,msrc:s.src}));return e.forEach((s,i)=>{const u=()=>{l==null||l.destroy(),l=new r({preloaderDelay:0,showHideAnimationType:"zoom",...t,dataSource:a,index:i,...n?{closeOnVerticalDrag:!0,wheelToZoom:!1}:{}}),Sh(l),l.addFilter("thumbEl",()=>s),l.addFilter("placeholderSrc",()=>s.src),l.init()};s.getAttribute("photo-swipe")||(s.style.cursor="zoom-in",s.addEventListener("click",()=>{u()}),s.addEventListener("keypress",({key:c})=>{c==="Enter"&&u()}),s.setAttribute("photo-swipe","")),Cu(s).then(c=>{a.splice(i,1,c),l==null||l.refreshSlideContent(i)})}),n?Ce("wheel",()=>{l==null||l.close()}):()=>{}}),Ih=({selector:e,locales:t,delay:n=500,scrollToClose:r=!0})=>{const l=Eh(),a=nn(t),s=he();let i=null;const u=()=>new Promise(c=>setTimeout(c,n)).then(()=>Ot()).then(async()=>{i=await Ah(Lh(e),{...l,...a.value},r)});fe(()=>{u(),le(()=>s.value.path,()=>{i==null||i(),u()})}),yn(()=>{i==null||i()})};var Ph={"/":{closeTitle:"关闭",downloadTitle:"下载图片",fullscreenTitle:"切换全屏",zoomTitle:"缩放",arrowPrevTitle:"上一个 (左箭头)",arrowNextTitle:"下一个 (右箭头)"}};const Mh=".theme-hope-content :not(a) > img:not([no-view])",Rh=Ph,Oh=800,$h=!0,Dh=nt({enhance:({app:e})=>{Ch(e)},setup:()=>{Ih({selector:Mh,delay:Oh,locales:Rh,scrollToClose:$h})}}),Nh=()=>o(ae,{name:"heading"},()=>o("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));Nh.displayName="HeadingIcon";const jh=()=>o(ae,{name:"heart"},()=>o("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));jh.displayName="HeartIcon";const Vh=()=>o(ae,{name:"history"},()=>o("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));Vh.displayName="HistoryIcon";const Hh=()=>o(ae,{name:"title"},()=>o("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));Hh.displayName="TitleIcon";const ms=()=>o(ae,{name:"search"},()=>o("path",{d:"M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"}));ms.displayName="SearchIcon";const Tu=()=>o("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",preserveAspectRatio:"xMidYMid",viewBox:"0 0 100 100"},[o("circle",{cx:"28",cy:"75",r:"11",fill:"currentColor"},o("animate",{attributeName:"fill-opacity",begin:"0s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),o("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 47a28 28 0 0 1 28 28"},o("animate",{attributeName:"stroke-opacity",begin:"0.1s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),o("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 25a50 50 0 0 1 50 50"},o("animate",{attributeName:"stroke-opacity",begin:"0.2s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"}))]);Tu.displayName="LoadingIcon";const Lu=({hint:e})=>o("div",{class:"search-pro-result-wrapper loading"},[o(Tu),e]);Lu.displayName="SearchLoading";const zh='<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>';var Bh={0:{"/":{0:"分",1:"类",2:":",3:" ",4:"$",5:"c",6:"o",7:"n",8:"t",9:"e",10:"n",11:"t"}},1:{"/":{0:"标",1:"签",2:":",3:" ",4:"$",5:"c",6:"o",7:"n",8:"t",9:"e",10:"n",11:"t"}}},Fh={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",searching:"搜索中",defaultTitle:"文档",select:"选择",navigate:"切换",autocomplete:"自动补全",exit:"关闭",queryHistory:"搜索历史",resultHistory:"历史结果",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},Gh={searchDelay:150,suggestDelay:0,queryHistoryCount:5,resultHistoryCount:5,hotKeys:[{key:"k",ctrl:!0},{key:"/",ctrl:!0}],worker:"search-pro.worker.js"};const vs=Gh,L6=Bh,Su=vs.hotKeys,ys=Fh;new URL("data:application/javascript;base64,aW1wb3J0e3NlYXJjaCBhcyBULGdldFN0b3JlZEZpZWxkcyBhcyB3LGF1dG9TdWdnZXN0IGFzICQsbG9hZEpTT05JbmRleCBhcyBifWZyb20ic2xpbXNlYXJjaCI7aW1wb3J0IEUgZnJvbSJAdGVtcC9zZWFyY2gtcHJvL2luZGV4LmpzIjtpbXBvcnR7ZW50cmllcyBhcyBGfWZyb20iQHZ1ZXByZXNzL2hlbHBlci9jbGllbnQiO2NvbnN0IFM9KGwsZSk9Pntjb25zdCBuPWwudG9Mb3dlckNhc2UoKSxzPWUudG9Mb3dlckNhc2UoKSxvPVtdO2xldCB0PTAsaT0wO2NvbnN0IHI9KGMsZz0hMSk9PntsZXQgdT0iIjtpPT09MD91PWMubGVuZ3RoPjIwP2DigKYgJHtjLnNsaWNlKC0yMCl9YDpjOmc/dT1jLmxlbmd0aCtpPjEwMD9gJHtjLnNsaWNlKDAsMTAwLWkpfeKApiBgOmM6dT1jLmxlbmd0aD4yMD9gJHtjLnNsaWNlKDAsMjApfSDigKYgJHtjLnNsaWNlKC0yMCl9YDpjLHUmJm8ucHVzaCh1KSxpKz11Lmxlbmd0aCxnfHwoby5wdXNoKFsibWFyayIsZV0pLGkrPWUubGVuZ3RoLGk+PTEwMCYmby5wdXNoKCIg4oCmIikpfTtsZXQgaD1uLmluZGV4T2Yocyx0KTtpZihoPT09LTEpcmV0dXJuIG51bGw7Zm9yKDtoPj0wOyl7Y29uc3QgYz1oK3MubGVuZ3RoO2lmKHIobC5zbGljZSh0LGgpKSx0PWMsaT4xMDApYnJlYWs7aD1uLmluZGV4T2Yocyx0KX1yZXR1cm4gaTwxMDAmJnIobC5zbGljZSh0KSwhMCksb30sQz0vW1x1NGUwMC1cdTlmYTVdL2csTT0obD17fSk9Pih7ZnV6enk6LjIscHJlZml4OiEwLHByb2Nlc3NUZXJtOmU9Pntjb25zdCBuPWUubWF0Y2goQyl8fFtdLHM9ZS5yZXBsYWNlKEMsIiIpLnRvTG93ZXJDYXNlKCk7cmV0dXJuIHM/W3MsLi4ubl06Wy4uLm5dfSwuLi5sfSksXz0obCxlKT0+ZS5jb250ZW50cy5yZWR1Y2UoKG4sWyxzXSk9Pm4rcywwKS1sLmNvbnRlbnRzLnJlZHVjZSgobixbLHNdKT0+bitzLDApLGs9KGwsZSk9Pk1hdGgubWF4KC4uLmUuY29udGVudHMubWFwKChbLG5dKT0+bikpLU1hdGgubWF4KC4uLmwuY29udGVudHMubWFwKChbLG5dKT0+bikpLE89KGwsZSxuPXt9KT0+e2NvbnN0IHM9e307cmV0dXJuIFQoZSxsLE0oe2Jvb3N0OntoOjIsdDoxLGM6NH0sLi4ubn0pKS5mb3JFYWNoKG89Pntjb25zdHtpZDp0LHRlcm1zOmksc2NvcmU6cn09byxoPXQuaW5jbHVkZXMoIkAiKSxjPXQuaW5jbHVkZXMoIiMiKSxbZyx1XT10LnNwbGl0KC9bI0BdLyksZj1OdW1iZXIoZyksbT1pLnNvcnQoKHAsYSk9PnAubGVuZ3RoLWEubGVuZ3RoKS5maWx0ZXIoKHAsYSk9Pmkuc2xpY2UoYSsxKS5ldmVyeShkPT4hZC5pbmNsdWRlcyhwKSkpLHtjb250ZW50czp5fT1zW2ZdPz89e3RpdGxlOiIiLGNvbnRlbnRzOltdfTtpZihoKXkucHVzaChbe3R5cGU6ImN1c3RvbUZpZWxkIixpZDpmLGluZGV4OnUsZGlzcGxheTptLm1hcChwPT5vLmMubWFwKGE9PlMoYSxwKSkpLmZsYXQoKS5maWx0ZXIocD0+cCE9PW51bGwpfSxyXSk7ZWxzZXtjb25zdCBwPW0ubWFwKGE9PlMoby5oLGEpKS5maWx0ZXIoYT0+YSE9PW51bGwpO2lmKHAubGVuZ3RoJiZ5LnB1c2goW3t0eXBlOmM/ImhlYWRpbmciOiJ0aXRsZSIsaWQ6ZiwuLi5jJiZ7YW5jaG9yOnV9LGRpc3BsYXk6cH0scl0pLCJ0ImluIG8pZm9yKGNvbnN0IGEgb2Ygby50KXtjb25zdCBkPW0ubWFwKHg9PlMoYSx4KSkuZmlsdGVyKHg9PnghPT1udWxsKTtkLmxlbmd0aCYmeS5wdXNoKFt7dHlwZToidGV4dCIsaWQ6ZiwuLi5jJiZ7YW5jaG9yOnV9LGRpc3BsYXk6ZH0scl0pfX19KSxGKHMpLnNvcnQoKFssb10sWyx0XSk9PlNFQVJDSF9QUk9fU09SVF9TVFJBVEVHWT09PSJ0b3RhbCI/XyhvLHQpOmsobyx0KSkubWFwKChbbyx7dGl0bGU6dCxjb250ZW50czppfV0pPT57aWYoIXQpe2NvbnN0IHI9dyhlLG8pO3ImJih0PXIuaCl9cmV0dXJue3RpdGxlOnQsY29udGVudHM6aS5tYXAoKFtyXSk9PnIpfX0pfSxSPShsLGUsbj17fSk9PiQoZSxsLE0obikpLm1hcCgoe3N1Z2dlc3Rpb246c30pPT5zKTtzZWxmLm9ubWVzc2FnZT1hc3luYyh7ZGF0YTp7dHlwZTpsPSJhbGwiLHF1ZXJ5OmUsbG9jYWxlOm4sb3B0aW9uczpzfX0pPT57Y29uc3R7ZGVmYXVsdDpvfT1hd2FpdCBFW25dKCksdD1iKG8se2ZpZWxkczpbImgiLCJ0IiwiYyJdLHN0b3JlRmllbGRzOlsiaCIsInQiLCJjIl19KTtsPT09InN1Z2dlc3QiP3NlbGYucG9zdE1lc3NhZ2UoUihlLHQscykpOmw9PT0ic2VhcmNoIj9zZWxmLnBvc3RNZXNzYWdlKE8oZSx0LHMpKTpzZWxmLnBvc3RNZXNzYWdlKHtzdWdnZXN0aW9uczpSKGUsdCxzKSxyZXN1bHRzOk8oZSx0LHMpfSl9OwovLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAK",import.meta.url);const Wh=()=>{const e=new Worker(`/${vs.worker}`,{}),t=[];return e.addEventListener("message",({data:n})=>{const{resolve:r}=t.shift();r(n)}),{search:n=>new Promise((r,l)=>{e.postMessage(n),t.push({resolve:r,reject:l})}),terminate:()=>{e.terminate(),t.forEach(({reject:n})=>n(new Error("Worker has been terminated.")))}}};let Uh={};const Au=Symbol(""),qh=()=>me(Au),Kh=e=>{e.provide(Au,Uh)},Zh=(e,t=!1)=>{const n=W(0),r=x(()=>e.value[n.value]),l=()=>{n.value=n.value>0?n.value-1:e.value.length-1},a=()=>{n.value=n.value<e.value.length-1?n.value+1:0};return le(e,()=>{t||(n.value=0)}),{index:n,item:r,prev:l,next:a}},Yh=e=>e instanceof Element?document.activeElement===e&&(["TEXTAREA","SELECT","INPUT"].includes(e.tagName)||e.hasAttribute("contenteditable")):!1,Xh=e=>Su.some(t=>{const{key:n,ctrl:r=!1,shift:l=!1,alt:a=!1,meta:s=!1}=t;return n===e.key&&r===e.ctrlKey&&l===e.shiftKey&&a===e.altKey&&s===e.metaKey}),Jh='<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>',Qh='<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>',e4='<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>',t4='<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>',bs=Symbol(""),n4=()=>{const e=W(!1);dt(bs,e)},r4=e=>{const t=W([]);{const n=qh(),r=Lt();fe(()=>{const l=lu(i=>{i?a({type:"suggest",query:i,locale:r.value,options:n}).then(u=>{t.value=u.length?gn(u[0],i)&&!u[0].slice(i.length).includes(" ")?u:[i,...u]:[]}).catch(u=>{console.error(u)}):t.value=[]},vs.suggestDelay),{search:a,terminate:s}=Wh();le([e,r],()=>l(e.value),{immediate:!0}),yn(()=>{s()})})}return{suggestions:t}},ra=Su[0];var l4=R({name:"SearchBox",setup(){const e=nn(ys),t=me(bs),n=W(!1),r=x(()=>ra?[(n.value?["⌃","⇧","⌥","⌘"]:["Ctrl","Shift","Alt","Win"]).filter((l,a)=>ra[["ctrl","shift","alt","meta"][a]]),ra.key.toUpperCase()]:null);return Ce("keydown",l=>{!t.value&&Xh(l)&&!Yh(l.target)&&(l.preventDefault(),t.value=!0)}),fe(()=>{const{userAgent:l}=navigator;n.value=m3(l)||g3(l)||h3(l)}),()=>[o("button",{type:"button",class:"search-pro-button","aria-label":e.value.search,onClick:()=>{t.value=!0}},[o(ms),o("div",{class:"search-pro-placeholder"},e.value.search),r.value?o("div",{class:"search-pro-key-hints"},r.value.map(l=>o("kbd",{class:"search-pro-key"},l))):null])]}});const a4=qi({loader:()=>A(()=>import("./SearchResult-3EY0Hmig.js"),__vite__mapDeps([])),loadingComponent:()=>{const e=nn(ys);return o(Lu,{hint:e.value.loading})}});var s4=R({name:"SearchModal",setup(){const e=me(bs),t=Kn(),n=f3(),r=nn(ys),l=W(""),{suggestions:a}=r4(l),s=W(!1),{index:i,prev:u,next:c}=Zh(a),d=Te(),p=Te(),f=(h=i.value)=>{l.value=a.value[h],s.value=!1};return Ce("keydown",h=>{s.value?h.key==="ArrowUp"?u():h.key==="ArrowDown"?c():h.key==="Enter"?f():h.key==="Escape"&&(s.value=!1):h.key==="Escape"&&(e.value=!1)}),fe(()=>{const h=fs(document.body);le(e,async v=>{var w;h.value=v,v&&(await Ot(),(w=d.value)==null||w.focus())}),O3(p,()=>{s.value=!1}),yn(()=>{h.value=!1})}),()=>e.value?o("div",{class:"search-pro-modal-wrapper"},[o("div",{class:"search-pro-mask",onClick:()=>{e.value=!1,l.value=""}}),o("div",{class:"search-pro-modal"},[o("div",{class:"search-pro-box"},[o("form",[o("label",{for:"search-pro","aria-label":r.value.search},o(ms)),o("input",{ref:d,type:"search",class:"search-pro-input",id:"search-pro",placeholder:r.value.placeholder,spellcheck:"false",autocapitalize:"off",autocomplete:"off",autocorrect:"off",name:`${t.value.title}-search`,value:l.value,"aria-controls":"search-pro-results",onKeydown:h=>{const{key:v}=h;a.value.length&&(v==="Tab"?(f(),h.preventDefault()):(v==="ArrowDown"||v==="ArrowUp"||v==="Escape")&&h.preventDefault())},onInput:({target:h})=>{l.value=h.value,s.value=!0,i.value=0}}),l.value?o("button",{type:"reset",class:"search-pro-clear-button",innerHTML:zh,onClick:()=>{l.value=""}}):null,s.value&&a.value.length?o("ul",{class:"search-pro-suggestions",ref:p},a.value.map((h,v)=>o("li",{class:["search-pro-suggestion",{active:v===i.value}],onClick:()=>{f(v)}},[o("kbd",{class:"search-pro-auto-complete",title:`Tab ${r.value.autocomplete}`},"Tab"),h]))):null]),o("button",{type:"button",class:"search-pro-close-button",onClick:()=>{e.value=!1,l.value=""}},r.value.cancel)]),o(a4,{query:l.value,isFocusing:!s.value,onClose:()=>{e.value=!1},onUpdateQuery:h=>{l.value=h}}),n.value?null:o("div",{class:"search-pro-hints"},[o("span",{class:"search-pro-hint"},[o("kbd",{innerHTML:Jh}),r.value.select]),o("span",{class:"search-pro-hint"},[o("kbd",{innerHTML:e4}),o("kbd",{innerHTML:Qh}),r.value.navigate]),o("span",{class:"search-pro-hint"},[o("kbd",{innerHTML:t4}),r.value.exit])])])]):null}}),o4=nt({enhance({app:e}){Kh(e),e.component("SearchBox",l4)},setup(){n4()},rootComponents:[s4]});const Iu=()=>{const e=he();return x(()=>e.value.readingTime??null)},Pu=(e,t)=>{const{minutes:n,words:r}=e,{less1Minute:l,word:a,time:s}=t;return{time:n<1?l:s.replace("$time",Math.round(n).toString()),words:a.replace("$word",r.toString())}};var ei={"/":{word:"约 $word 字",less1Minute:"小于 1 分钟",time:"大约 $time 分钟"}};const ti={words:"",time:""},La=typeof ei>"u"?null:ei,Mu=()=>La?nn(La):x(()=>null),i4=()=>{if(typeof La>"u")return x(()=>ti);const e=Iu(),t=Mu();return x(()=>e.value&&t.value?Pu(e.value,t.value):ti)},Nt=()=>gu(),oe=()=>Cf(),_n=()=>{const e=Nt();return x(()=>!!e.value.pure)},la=()=>null,c4="719px",u4="1440px",d4="false",xs={mobileBreakPoint:c4,pcBreakPoint:u4,enableThemeColor:d4},ws={},Ru=e=>{const{icon:t="",color:n,size:r}=e,l=n||r?{}:null;return n&&(l.color=n),r&&(l.height=Number.isNaN(Number(r))?r:`${r}px`),tn(t)?o("img",{class:"icon",src:t,alt:"","no-view":"",style:l}):Tl(t)?o("img",{class:"icon",src:Se(t),alt:"","aria-hidden":"","no-view":"",style:l}):o(ut("FontIcon"),e)};Ru.displayName="HopeIcon";var Be=Ru;const Rr=()=>{const e=Dt(),t=Ct();return n=>{if(n)if(Tl(n))t.path!==n&&e.push(n);else if(wc(n))window&&window.open(n);else{const r=t.path.slice(0,t.path.lastIndexOf("/"));e.push(`${r}/${encodeURI(n)}`)}}},Ou=()=>{const e=oe(),t=be();return x(()=>{const{author:n}=t.value;return n?kr(n):n===!1?[]:kr(e.value.author,!1)})},p4=()=>{const e=be(),t=me(Symbol.for("categoryMap"));return x(()=>tu(e.value.category).map(n=>{var r;return{name:n,path:((r=t==null?void 0:t.value.map[n])==null?void 0:r.path)||""}}))},f4=()=>{const e=be(),t=me(Symbol.for("tagMap"));return x(()=>nu(e.value.tag).map(n=>{var r;return{name:n,path:((r=t==null?void 0:t.value.map[n])==null?void 0:r.path)||""}}))},h4=()=>{const e=be(),t=he();return x(()=>{const n=cs(e.value.date);if(n)return n;const{createdTime:r}=t.value.git||{};return r?new Date(r):null})},g4=()=>{const e=oe(),t=he(),n=be(),r=Ou(),l=p4(),a=f4(),s=h4(),i=Iu(),u=i4(),c=x(()=>({author:r.value,category:l.value,date:s.value,localizedDate:t.value.localizedDate,tag:a.value,isOriginal:n.value.isOriginal||!1,readingTime:i.value,readingTimeLocale:u.value,pageview:"pageview"in n.value?n.value.pageview:!0})),d=x(()=>"pageInfo"in n.value?n.value.pageInfo:"pageInfo"in e.value?e.value.pageInfo:null);return{info:c,items:d}},{mobileBreakPoint:m4,pcBreakPoint:v4}=xs,ni=e=>e.endsWith("px")?Number(e.slice(0,-2)):null,Or=()=>{const e=W(!1),t=W(!1),n=()=>{e.value=window.innerWidth<=(ni(m4)??719),t.value=window.innerWidth>=(ni(v4)??1440)};return fe(()=>{n(),Ce("resize",n,!1),Ce("orientationchange",n,!1)}),{isMobile:e,isPC:t}},$u=Symbol(""),$r=()=>{const e=me($u);if(!e)throw new Error("useDarkmode() is called without provider.");return e},y4=e=>{const t=Nt(),n=B3(),r=x(()=>t.value.darkmode||"switch"),l=wn("vuepress-theme-hope-scheme","auto"),a=x(()=>{const i=r.value;return i==="disable"?!1:i==="enable"?!0:i==="auto"?n.value:i==="toggle"?l.value==="dark":l.value==="dark"||l.value==="auto"&&n.value}),s=x(()=>{const i=r.value;return i==="switch"||i==="toggle"});e.provide($u,{canToggle:s,config:r,isDarkmode:a,status:l}),Object.defineProperties(e.config.globalProperties,{$isDarkmode:{get:()=>a.value}})},b4=()=>{const{config:e,isDarkmode:t,status:n}=$r();Bi(()=>{e.value==="disable"?n.value="light":e.value==="enable"?n.value="dark":e.value==="toggle"&&n.value==="auto"&&(n.value="light")}),fe(()=>{le(t,r=>document.documentElement.setAttribute("data-theme",r?"dark":"light"),{immediate:!0})})};var Ke=R({name:"AutoLink",inheritAttrs:!1,props:{config:{type:Object,required:!0},exact:Boolean,noExternalLinkIcon:Boolean},emits:["focusout"],slots:Object,setup(e,{attrs:t,emit:n,slots:r}){const l=Ct(),a=Rc(),s=Un(e,"config"),i=x(()=>tn(s.value.link)),u=x(()=>!i.value&&wc(s.value.link)),c=x(()=>s.value.target||(i.value?"_blank":void 0)),d=x(()=>c.value==="_blank"),p=x(()=>!i.value&&!u.value&&!d.value),f=x(()=>s.value.rel||(d.value?"noopener noreferrer":null)),h=x(()=>s.value.ariaLabel||s.value.text),v=x(()=>{if(e.exact)return!1;const _=tt(a.value.locales);return _.length?_.every(y=>y!==s.value.link):s.value.link!=="/"}),w=x(()=>p.value?s.value.activeMatch?new RegExp(s.value.activeMatch,"u").test(l.path):v.value?gn(l.path,s.value.link):l.path===s.value.link:!1);return()=>{const{before:_,after:y,default:S}=r,{text:b,icon:C,link:D}=s.value;return p.value?o(Pe,{to:D,"aria-label":h.value,...t,class:["nav-link",{active:w.value},t.class],onFocusout:()=>n("focusout")},()=>S?S():[_?_():o(Be,{icon:C}),b,y==null?void 0:y()]):o("a",{href:D,rel:f.value,target:c.value,"aria-label":h.value,...t,class:["nav-link",t.class],onFocusout:()=>n("focusout")},S?S():[_?_():o(Be,{icon:C}),b,e.noExternalLinkIcon?null:o(fu),y==null?void 0:y()])}}});const Fn=(e,t,n=!1)=>"activeMatch"in t?new RegExp(t.activeMatch,"u").test(e.path):Xc(e,t.link)?!0:t.children&&!n?t.children.some(r=>Fn(e,r)):!1,Du=(e,t)=>t.type==="group"?t.children.some(n=>n.type==="group"?Du(e,n):n.type==="page"&&Fn(e,n,!0))||"prefix"in t&&Xc(e,t.prefix):!1,Nu=(e,t)=>Me(e.link)?o(Ke,{...t,config:e}):o("p",t,[o(Be,{icon:e.icon}),e.text]),ju=e=>{const t=Ct();return e?o("ul",{class:"vp-sidebar-sub-headers"},e.map(n=>o("li",{class:"vp-sidebar-sub-header"},[Nu(n,{class:["vp-sidebar-link","vp-heading",{active:Fn(t,n,!0)}]}),ju(n.children)]))):null};var ye=(e=>(e.type="y",e.title="t",e.shortTitle="s",e.icon="i",e.author="a",e.date="d",e.localizedDate="l",e.category="c",e.tag="g",e.isEncrypted="n",e.isOriginal="o",e.readingTime="r",e.excerpt="e",e.sticky="u",e.cover="v",e.index="I",e.order="O",e))(ye||{}),Vu=(e=>(e.article="a",e.home="h",e.slide="s",e.page="p",e))(Vu||{});const dn=(e="",t="")=>Tl(t)?t:`${xc(e)}${t}`,Dn=(e,t=!1)=>{const{meta:n,path:r}=Zn(e);return n?{text:!t&&n[ye.shortTitle]?n[ye.shortTitle]:n[ye.title]||r,link:r,...n[ye.icon]?{icon:n[ye.icon]}:{}}:{text:r,link:r}},Il=(e,t,n)=>n>0?t.map(r=>({type:"heading",text:r.title,link:`${e.path}#${r.slug}`,children:Il(e,r.children,n-1)})):[],Sa=({config:e,page:t,headerDepth:n,prefix:r=""})=>{const l=(a,s=r)=>{var u;const i=Me(a)?Dn(dn(s,a)):a.link?{...a,...br(a.link)?{}:{link:Dn(dn(s,a.link)).link}}:a;if("children"in i){const c=dn(s,i.prefix),d=i.children==="structure"?ws[c]:i.children;return{type:"group",...i,prefix:c,children:d.map(p=>l(p,c))}}return{type:"page",...i,children:i.link===t.path?Il(t,((u=t.headers[0])==null?void 0:u.level)===1?t.headers[0].children:t.headers,n):[]}};return e.map(a=>l(a))},x4=({config:e,page:t,headerDepth:n})=>{const r=tt(e).sort((l,a)=>a.length-l.length);for(const l of r)if(gn(decodeURI(t.path),l)){const a=e[l];return a?Sa({config:a==="structure"?ws[l]:a==="heading"?Il(t,t.headers,n):a,page:t,headerDepth:n,prefix:l}):[]}return console.warn(`${t.path} is missing sidebar config.`),[]},w4=({config:e,routeLocale:t,page:n,headerDepth:r})=>e==="heading"?Il(n,n.headers,r):e==="structure"?Sa({config:ws[t],page:n,headerDepth:r,prefix:t}):Ca(e)?Sa({config:e,page:n,headerDepth:r}):qn(e)?x4({config:e,page:n,headerDepth:r}):[],Hu=Symbol(""),_4=()=>{const e=be(),t=oe(),n=he(),r=Lt(),l=x(()=>e.value.home?!1:e.value.sidebar??t.value.sidebar??"structure"),a=x(()=>e.value.headerDepth??t.value.headerDepth??2),s=us(()=>[l.value,a.value,n.value.path,null],()=>w4({config:l.value,routeLocale:r.value,page:n.value,headerDepth:a.value}));dt(Hu,s)},_s=()=>{const e=me(Hu);if(!e)throw new Error("useSidebarItems() is called without provider.");return e};var k4=R({name:"PageFooter",setup(){const e=Nt(),t=oe(),n=be(),r=Ou(),l=x(()=>{const{copyright:c,footer:d}=n.value;return d!==!1&&!!(c||d||t.value.displayFooter)}),a=x(()=>{const{footer:c}=n.value;return c===!1?!1:Me(c)?c:t.value.footer||""}),s=x(()=>r.value.map(({name:c})=>c).join(", ")),i=c=>`Copyright © ${new Date().getFullYear()} ${s.value} ${c?`${c} Licensed`:""}`,u=x(()=>{const{copyright:c,license:d=""}=n.value,{license:p}=e.value,{copyright:f}=t.value;return c??(d?i(d):Me(f)?f:s.value||p?i(p):!1)});return()=>l.value?o("footer",{class:"vp-footer-wrapper"},[a.value?o("div",{class:"vp-footer",innerHTML:a.value}):null,u.value?o("div",{class:"vp-copyright",innerHTML:u.value}):null]):null}}),E4=R({name:"NavbarDropdownLink",props:{config:{type:Object,required:!0}},slots:Object,setup(e,{slots:t}){const n=he(),r=Un(e,"config"),l=x(()=>r.value.ariaLabel||r.value.text),a=W(!1);le(()=>n.value.path,()=>{a.value=!1});const s=i=>{i.detail===0&&(a.value=!a.value)};return()=>{var i;return o("div",{class:["dropdown-wrapper",{open:a.value}]},[o("button",{type:"button",class:"dropdown-title","aria-label":l.value,onClick:s},[((i=t.title)==null?void 0:i.call(t))||o("span",{class:"title"},[o(Be,{icon:r.value.icon}),e.config.text]),o("span",{class:"arrow"}),o("ul",{class:"nav-dropdown"},r.value.children.map((u,c)=>{const d=c===r.value.children.length-1;return o("li",{class:"dropdown-item"},"children"in u?[o("h4",{class:"dropdown-subtitle"},u.link?o(Ke,{config:u,onFocusout:()=>{u.children.length===0&&d&&(a.value=!1)}}):o("span",u.text)),o("ul",{class:"dropdown-subitem-wrapper"},u.children.map((p,f)=>o("li",{class:"dropdown-subitem"},o(Ke,{config:p,onFocusout:()=>{f===u.children.length-1&&d&&(a.value=!1)}}))))]:o(Ke,{config:u,onFocusout:()=>{d&&(a.value=!1)}}))}))])])}}});const zu=(e,t="")=>Me(e)?Dn(dn(t,e)):"children"in e?{...e,...e.link&&!br(e.link)?Dn(dn(t,e.link)):{},children:e.children.map(n=>zu(n,dn(t,e.prefix)))}:{...e,link:br(e.link)?e.link:Dn(dn(t,e.link)).link},Bu=()=>{const e=oe(),t=()=>(e.value.navbar||[]).map(n=>zu(n));return us(()=>e.value.navbar,()=>t())},C4=()=>{const e=oe(),t=x(()=>e.value.repo||null),n=x(()=>t.value?b3(t.value):null),r=x(()=>t.value?Jc(t.value):null),l=x(()=>n.value?e.value.repoLabel??(r.value===null?"Source":r.value):null);return x(()=>!n.value||!l.value||e.value.repoDisplay===!1?null:{type:r.value||"Source",label:l.value,link:n.value})};var T4=R({name:"NavScreenDropdown",props:{config:{type:Object,required:!0}},setup(e){const t=he(),n=Un(e,"config"),r=x(()=>n.value.ariaLabel||n.value.text),l=W(!1);le(()=>t.value.path,()=>{l.value=!1});const a=(s,i)=>i[i.length-1]===s;return()=>[o("button",{type:"button",class:["nav-screen-dropdown-title",{active:l.value}],"aria-label":r.value,onClick:()=>{l.value=!l.value}},[o("span",{class:"title"},[o(Be,{icon:n.value.icon}),e.config.text]),o("span",{class:["arrow",l.value?"down":"end"]})]),o("ul",{class:["nav-screen-dropdown",{hide:!l.value}]},n.value.children.map(s=>o("li",{class:"dropdown-item"},"children"in s?[o("h4",{class:"dropdown-subtitle"},s.link?o(Ke,{config:s,onFocusout:()=>{a(s,n.value.children)&&s.children.length===0&&(l.value=!1)}}):o("span",s.text)),o("ul",{class:"dropdown-subitem-wrapper"},s.children.map(i=>o("li",{class:"dropdown-subitem"},o(Ke,{config:i,onFocusout:()=>{a(i,s.children)&&a(s,n.value.children)&&(l.value=!1)}}))))]:o(Ke,{config:s,onFocusout:()=>{a(s,n.value.children)&&(l.value=!1)}}))))]}}),L4=R({name:"NavScreenLinks",setup(){const e=Bu();return()=>e.value.length?o("nav",{class:"nav-screen-links"},e.value.map(t=>o("div",{class:"navbar-links-item"},"children"in t?o(T4,{config:t}):o(Ke,{config:t})))):null}});const Fu=()=>o(ae,{name:"dark"},()=>o("path",{d:"M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"}));Fu.displayName="DarkIcon";const Gu=()=>o(ae,{name:"light"},()=>o("path",{d:"M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"}));Gu.displayName="LightIcon";const Wu=()=>o(ae,{name:"auto"},()=>o("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"}));Wu.displayName="AutoIcon";const Uu=()=>o(ae,{name:"enter-fullscreen"},()=>o("path",{d:"M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"}));Uu.displayName="EnterFullScreenIcon";const qu=()=>o(ae,{name:"cancel-fullscreen"},()=>o("path",{d:"M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"}));qu.displayName="CancelFullScreenIcon";const Ku=()=>o(ae,{name:"outlook"},()=>[o("path",{d:"M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"})]);Ku.displayName="OutlookIcon";var Zu=R({name:"AppearanceSwitch",setup(){const{config:e,isDarkmode:t,status:n}=$r(),r=_n(),l=()=>{e.value==="switch"?n.value={light:"dark",dark:"auto",auto:"light"}[n.value]:n.value=n.value==="light"?"dark":"light"},a=async s=>{if(!(document.startViewTransition&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!r.value)||!s){l();return}const i=s.clientX,u=s.clientY,c=Math.hypot(Math.max(i,innerWidth-i),Math.max(u,innerHeight-u)),d=t.value;await document.startViewTransition(async()=>{l(),await Ot()}).ready,t.value!==d&&document.documentElement.animate({clipPath:t.value?[`circle(${c}px at ${i}px ${u}px)`,`circle(0px at ${i}px ${u}px)`]:[`circle(0px at ${i}px ${u}px)`,`circle(${c}px at ${i}px ${u}px)`]},{duration:400,pseudoElement:t.value?"::view-transition-old(root)":"::view-transition-new(root)"})};return()=>o("button",{type:"button",id:"appearance-switch",onClick:a},[o(Wu,{style:{display:n.value==="auto"?"block":"none"}}),o(Fu,{style:{display:n.value==="dark"?"block":"none"}}),o(Gu,{style:{display:n.value==="light"?"block":"none"}})])}}),S4=R({name:"AppearanceMode",setup(){const e=oe(),{canToggle:t}=$r(),n=x(()=>e.value.outlookLocales.darkmode);return()=>t.value?o("div",{class:"appearance-wrapper"},[o("label",{class:"appearance-title",for:"appearance-switch"},n.value),o(Zu)]):null}});const aa="VUEPRESS_THEME_COLOR";var A4=R({name:"ThemeColorPicker",props:{themeColor:{type:Object,required:!0}},setup(e){const t=(n="")=>{const r=document.documentElement.classList,l=tt(e.themeColor);if(!n){localStorage.removeItem(aa),r.remove(...l);return}r.remove(...l.filter(a=>a!==n)),r.add(n),localStorage.setItem(aa,n)};return fe(()=>{const n=localStorage.getItem(aa);n&&t(n)}),()=>o("ul",{id:"theme-color-picker"},[o("li",o("span",{class:"theme-color",onClick:()=>t()})),xn(e.themeColor).map(([n,r])=>o("li",o("span",{style:{background:r},onClick:()=>t(n)})))])}});const Nn=xs.enableThemeColor==="true",I4=Nn?c3(xn(xs).filter(([e])=>e.startsWith("theme-"))):{};var P4=R({name:"ThemeColor",setup(){const e=oe(),t=x(()=>e.value.outlookLocales.themeColor);return()=>Nn?o("div",{class:"theme-color-wrapper"},[o("label",{class:"theme-color-title",for:"theme-color-picker"},t.value),o(A4,{themeColor:I4})]):null}}),Yu=R({name:"ToggleFullScreenButton",setup(){const e=oe(),{isSupported:t,isFullscreen:n,toggle:r}=ps(),l=x(()=>e.value.outlookLocales.fullscreen);return()=>t?o("div",{class:"full-screen-wrapper"},[o("label",{class:"full-screen-title",for:"full-screen-switch"},l.value),o("button",{type:"button",id:"full-screen-switch",class:"full-screen",ariaPressed:n.value,onClick:()=>r()},n.value?o(qu):o(Uu))]):null}}),Xu=R({name:"OutlookSettings",setup(){const e=Nt(),t=_n(),n=x(()=>!t.value&&e.value.fullscreen);return()=>o(Cl,()=>[Nn?o(P4):null,o(S4),n.value?o(Yu):null])}}),M4=R({name:"NavScreen",props:{show:Boolean},emits:["close"],slots:Object,setup(e,{emit:t,slots:n}){const r=he(),{isMobile:l}=Or(),a=Te(),s=fs(a);return fe(()=>{a.value=document.body,le(l,i=>{!i&&e.show&&(s.value=!1,t("close"))}),le(()=>r.value.path,()=>{s.value=!1,t("close")})}),yn(()=>{s.value=!1}),()=>o(Qt,{name:"fade",onEnter:()=>{s.value=!0},onAfterLeave:()=>{s.value=!1}},()=>{var i,u;return e.show?o("div",{id:"nav-screen"},o("div",{class:"vp-nav-screen-container"},[(i=n.before)==null?void 0:i.call(n),o(L4),o("div",{class:"vp-outlook-wrapper"},o(Xu)),(u=n.after)==null?void 0:u.call(n)])):null})}}),R4=R({name:"NavbarBrand",setup(){const e=Lt(),t=Kn(),n=oe(),r=x(()=>n.value.home||e.value),l=x(()=>t.value.title),a=x(()=>n.value.navTitle??l.value),s=x(()=>n.value.logo?Se(n.value.logo):null),i=x(()=>n.value.logoDark?Se(n.value.logoDark):null);return()=>o(Pe,{to:r.value,class:"vp-brand"},()=>[s.value?o("img",{class:["vp-nav-logo",{light:!!i.value}],src:s.value,alt:""}):null,i.value?o("img",{class:["vp-nav-logo dark"],src:i.value,alt:""}):null,a.value?o("span",{class:["vp-site-name",{"hide-in-pad":s.value&&n.value.hideSiteNameOnMobile!==!1}]},a.value):null])}}),O4=R({name:"NavbarLinks",setup(){const e=Bu();return()=>e.value.length?o("nav",{class:"vp-nav-links"},e.value.map(t=>o("div",{class:"nav-item hide-in-mobile"},"children"in t?o(E4,{config:t}):o(Ke,{config:t})))):null}}),$4=R({name:"RepoLink",components:{BitbucketIcon:Kc,GiteeIcon:qc,GitHubIcon:Wc,GitLabIcon:Uc,SourceIcon:Zc},setup(){const e=C4();return()=>e.value?o("div",{class:"nav-item vp-repo"},o("a",{class:"vp-repo-link",href:e.value.link,target:"_blank",rel:"noopener noreferrer","aria-label":e.value.label},o(ut(`${e.value.type}Icon`),{style:{width:"1.25rem",height:"1.25rem",verticalAlign:"middle"}}))):null}});const Ju=({active:e=!1},{emit:t})=>o("button",{type:"button",class:["vp-toggle-navbar-button",{"is-active":e}],"aria-label":"Toggle Navbar","aria-expanded":e,"aria-controls":"nav-screen",onClick:()=>t("toggle")},o("span",[o("span",{class:"vp-top"}),o("span",{class:"vp-middle"}),o("span",{class:"vp-bottom"})]));Ju.displayName="ToggleNavbarButton";var D4=Ju;const Aa=(e,{emit:t})=>o("button",{type:"button",class:"vp-toggle-sidebar-button",title:"Toggle Sidebar",onClick:()=>t("toggle")},o("span",{class:"icon"}));Aa.displayName="ToggleSidebarButton",Aa.emits=["toggle"];var N4=Aa,j4=R({name:"OutlookButton",setup(){const{isSupported:e}=ps(),t=Nt(),n=_n(),r=he(),{canToggle:l}=$r(),a=W(!1),s=x(()=>!n.value&&t.value.fullscreen&&e);return le(()=>r.value.path,()=>{a.value=!1}),()=>l.value||s.value||Nn?o("div",{class:"nav-item hide-in-mobile"},l.value&&!s.value&&!Nn?o(Zu):s.value&&!l.value&&!Nn?o(Yu):o("button",{type:"button",class:["outlook-button",{open:a.value}],tabindex:"-1","aria-hidden":!0},[o(Ku),o("div",{class:"outlook-dropdown"},o(Xu))])):null}}),V4=R({name:"NavBar",emits:["toggleSidebar"],slots:Object,setup(e,{emit:t,slots:n}){const r=oe(),{isMobile:l}=Or(),a=W(!1),s=x(()=>{const{navbarAutoHide:d="mobile"}=r.value;return d!=="none"&&(d==="always"||l.value)}),i=x(()=>r.value.navbarLayout||{start:["Brand"],center:["Links"],end:["Language","Repo","Outlook","Search"]}),u={Brand:R4,Language:la,Links:O4,Repo:$4,Outlook:j4,Search:Et("Docsearch")?ut("Docsearch"):Et("SearchBox")?ut("SearchBox"):la},c=d=>u[d]??(Et(d)?ut(d):la);return()=>{var d,p,f,h,v,w;return[o("header",{id:"navbar",class:["vp-navbar",{"auto-hide":s.value,"hide-icon":r.value.navbarIcon===!1}]},[o("div",{class:"vp-navbar-start"},[o(N4,{onToggle:()=>{a.value&&(a.value=!1),t("toggleSidebar")}}),(d=n.startBefore)==null?void 0:d.call(n),(i.value.start||[]).map(_=>o(c(_))),(p=n.startAfter)==null?void 0:p.call(n)]),o("div",{class:"vp-navbar-center"},[(f=n.centerBefore)==null?void 0:f.call(n),(i.value.center||[]).map(_=>o(c(_))),(h=n.centerAfter)==null?void 0:h.call(n)]),o("div",{class:"vp-navbar-end"},[(v=n.endBefore)==null?void 0:v.call(n),(i.value.end||[]).map(_=>o(c(_))),(w=n.endAfter)==null?void 0:w.call(n),o(D4,{active:a.value,onToggle:()=>{a.value=!a.value}})])]),o(M4,{show:a.value,onClose:()=>{a.value=!1}},{before:()=>{var _;return(_=n.screenTop)==null?void 0:_.call(n)},after:()=>{var _;return(_=n.screenBottom)==null?void 0:_.call(n)}})]}}}),H4=R({name:"SidebarChild",props:{config:{type:Object,required:!0}},setup(e){const t=Ct();return()=>[Nu(e.config,{class:["vp-sidebar-link",`vp-sidebar-${e.config.type}`,{active:Fn(t,e.config,!0)}],exact:!0}),ju(e.config.children)]}}),z4=R({name:"SidebarGroup",props:{config:{type:Object,required:!0},open:{type:Boolean,required:!0}},emits:["toggle"],setup(e,{emit:t}){const n=Ct(),r=x(()=>Fn(n,e.config)),l=x(()=>Fn(n,e.config,!0));return()=>{const{collapsible:a,children:s=[],icon:i,prefix:u,link:c,text:d}=e.config;return o("section",{class:"vp-sidebar-group"},[o(a?"button":"p",{class:["vp-sidebar-heading",{clickable:a||c,exact:l.value,active:r.value}],...a?{type:"button",onClick:()=>t("toggle"),onKeydown:p=>{p.key==="Enter"&&t("toggle")}}:{}},[o(Be,{icon:i}),c?o(Ke,{class:"vp-sidebar-title",config:{text:d,link:c},noExternalLinkIcon:!0}):o("span",{class:"vp-sidebar-title"},d),a?o("span",{class:["vp-arrow",e.open?"down":"end"]}):null]),e.open||!a?o(Qu,{key:u,config:s}):null])}}}),Qu=R({name:"SidebarLinks",props:{config:{type:Array,required:!0}},setup(e){const t=Ct(),n=W(-1),r=l=>{n.value=l===n.value?-1:l};return le(()=>t.path,()=>{const l=e.config.findIndex(a=>Du(t,a));n.value=l},{immediate:!0,flush:"post"}),()=>o("ul",{class:"vp-sidebar-links"},e.config.map((l,a)=>o("li",l.type==="group"?o(z4,{config:l,open:a===n.value,onToggle:()=>r(a)}):o(H4,{config:l}))))}}),B4=R({name:"SideBar",slots:Object,setup(e,{slots:t}){const n=Ct(),r=oe(),l=_s(),a=Te();return fe(()=>{le(()=>n.hash,s=>{const i=document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${n.path}${s}"]`);if(!i)return;const{top:u,height:c}=a.value.getBoundingClientRect(),{top:d,height:p}=i.getBoundingClientRect();d<u?i.scrollIntoView(!0):d+p>u+c&&i.scrollIntoView(!1)},{immediate:!0})}),()=>{var s,i,u;return o("aside",{ref:a,id:"sidebar",class:["vp-sidebar",{"hide-icon":r.value.sidebarIcon===!1}]},[(s=t.top)==null?void 0:s.call(t),((i=t.default)==null?void 0:i.call(t))||o(Qu,{config:l.value}),(u=t.bottom)==null?void 0:u.call(t)])}}}),ks=R({name:"CommonWrapper",props:{containerClass:{type:String,default:""},noNavbar:Boolean,noSidebar:Boolean,noToc:Boolean},slots:Object,setup(e,{slots:t}){const n=Dt(),r=he(),l=be(),a=oe(),{isMobile:s,isPC:i}=Or(),[u,c]=hl(!1),[d,p]=hl(!1),f=_s(),h=W(!1),v=x(()=>e.noNavbar||l.value.navbar===!1||a.value.navbar===!1?!1:!!(r.value.title||a.value.logo||a.value.repo||a.value.navbar)),w=x(()=>e.noSidebar?!1:l.value.sidebar!==!1&&f.value.length!==0&&!l.value.home),_=x(()=>e.noToc||l.value.home?!1:l.value.toc||a.value.toc!==!1&&l.value.toc!==!1),y={x:0,y:0},S=E=>{y.x=E.changedTouches[0].clientX,y.y=E.changedTouches[0].clientY},b=E=>{const q=E.changedTouches[0].clientX-y.x,N=E.changedTouches[0].clientY-y.y;Math.abs(q)>Math.abs(N)*1.5&&Math.abs(q)>40&&(q>0&&y.x<=80?c(!0):c(!1))},C=()=>window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;let D=0;return Ce("scroll",I3(()=>{const E=C();E<=58||E<D?h.value=!1:D+200<E&&!u.value&&(h.value=!0),D=E},300,!0)),le(s,E=>{E||c(!1)}),fe(()=>{const E=fs(document.body);le(u,N=>{E.value=N});const q=n.afterEach(()=>{c(!1)});yn(()=>{E.value=!1,q()})}),()=>o(Et("GlobalEncrypt")?ut("GlobalEncrypt"):Gc,()=>o("div",{class:["theme-container",{"no-navbar":!v.value,"no-sidebar":!w.value&&!(t.sidebar||t.sidebarTop||t.sidebarBottom),"has-toc":_.value,"hide-navbar":h.value,"sidebar-collapsed":!s.value&&!i.value&&d.value,"sidebar-open":s.value&&u.value},e.containerClass,l.value.containerClass||""],onTouchStart:S,onTouchEnd:b},[v.value?o(V4,{onToggleSidebar:()=>c()},{startBefore:()=>{var E;return(E=t.navbarStartBefore)==null?void 0:E.call(t)},startAfter:()=>{var E;return(E=t.navbarStartAfter)==null?void 0:E.call(t)},centerBefore:()=>{var E;return(E=t.navbarCenterBefore)==null?void 0:E.call(t)},centerAfter:()=>{var E;return(E=t.navbarCenterAfter)==null?void 0:E.call(t)},endBefore:()=>{var E;return(E=t.navbarEndBefore)==null?void 0:E.call(t)},endAfter:()=>{var E;return(E=t.navbarEndAfter)==null?void 0:E.call(t)},screenTop:()=>{var E;return(E=t.navScreenTop)==null?void 0:E.call(t)},screenBottom:()=>{var E;return(E=t.navScreenBottom)==null?void 0:E.call(t)}}):null,o(Qt,{name:"fade"},()=>u.value?o("div",{class:"vp-sidebar-mask",onClick:()=>c(!1)}):null),o(Qt,{name:"fade"},()=>s.value?null:o("div",{class:"toggle-sidebar-wrapper",onClick:()=>p()},o("span",{class:["arrow",d.value?"end":"start"]}))),o(B4,{},{...t.sidebar?{default:()=>t.sidebar()}:{},top:()=>{var E;return(E=t.sidebarTop)==null?void 0:E.call(t)},bottom:()=>{var E;return(E=t.sidebarBottom)==null?void 0:E.call(t)}}),t.default(),o(k4)]))}}),pe=R({name:"DropTransition",props:{type:{type:String,default:"single"},delay:{type:Number,default:0},duration:{type:Number,default:.25},appear:Boolean},slots:Object,setup(e,{slots:t}){const n=l=>{l.style.transition=`transform ${e.duration}s ease-in-out ${e.delay}s, opacity ${e.duration}s ease-in-out ${e.delay}s`,l.style.transform="translateY(-20px)",l.style.opacity="0"},r=l=>{l.style.transform="translateY(0)",l.style.opacity="1"};return()=>o(e.type==="single"?Qt:c2,{name:"drop",appear:e.appear,onAppear:n,onAfterAppear:r,onEnter:n,onAfterEnter:r,onBeforeLeave:n},()=>t.default())}});const Ia=({custom:e})=>o(Dc,{class:["theme-hope-content",{custom:e}]});Ia.displayName="MarkdownContent",Ia.props={custom:Boolean};var Es=Ia;const ed=()=>o(ae,{name:"author"},()=>o("path",{d:"M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"}));ed.displayName="AuthorIcon";const td=()=>o(ae,{name:"calendar"},()=>o("path",{d:"M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"}));td.displayName="CalendarIcon";const nd=()=>o(ae,{name:"category"},()=>o("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));nd.displayName="CategoryIcon";const rd=()=>o(ae,{name:"print"},()=>o("path",{d:"M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"}));rd.displayName="PrintIcon";const ld=()=>o(ae,{name:"tag"},()=>o("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));ld.displayName="TagIcon";const ad=()=>o(ae,{name:"timer"},()=>o("path",{d:"M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"}));ad.displayName="TimerIcon";const sd=()=>o(ae,{name:"word"},()=>[o("path",{d:"M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"}),o("path",{d:"M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"})]);sd.displayName="WordIcon";const ln=()=>{const e=oe();return x(()=>e.value.metaLocales)};var F4=R({name:"AuthorInfo",inheritAttrs:!1,props:{author:{type:Array,required:!0},pure:Boolean},setup(e){const t=ln();return()=>e.author.length?o("span",{class:"page-author-info","aria-label":`${t.value.author}${e.pure?"":"🖊"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[o(ed),o("span",e.author.map(n=>n.url?o("a",{class:"page-author-item",href:n.url,target:"_blank",rel:"noopener noreferrer"},n.name):o("span",{class:"page-author-item"},n.name))),o("span",{property:"author",content:e.author.map(n=>n.name).join(", ")})]):null}}),G4=R({name:"CategoryInfo",inheritAttrs:!1,props:{category:{type:Array,required:!0},pure:Boolean},setup(e){const t=Dt(),n=he(),r=ln(),l=(a,s="")=>{s&&n.value.path!==s&&(a.preventDefault(),t.push(s))};return()=>e.category.length?o("span",{class:"page-category-info","aria-label":`${r.value.category}${e.pure?"":"🌈"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[o(nd),e.category.map(({name:a,path:s})=>o("span",{class:["page-category-item",{[`category${Sl(a,9)}`]:!e.pure,clickable:s}],role:s?"navigation":"",onClick:i=>l(i,s)},a)),o("meta",{property:"articleSection",content:e.category.map(({name:a})=>a).join(",")})]):null}}),W4=R({name:"DateInfo",inheritAttrs:!1,props:{date:{type:Object,default:null},localizedDate:{type:String,default:""},pure:Boolean},setup(e){const t=os(),n=ln();return()=>e.date?o("span",{class:"page-date-info","aria-label":`${n.value.date}${e.pure?"":"📅"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[o(td),o("span",o(Cl,()=>e.localizedDate||e.date.toLocaleDateString(t.value))),o("meta",{property:"datePublished",content:e.date.toISOString()||""})]):null}}),U4=R({name:"OriginalInfo",inheritAttrs:!1,props:{isOriginal:Boolean},setup(e){const t=ln();return()=>e.isOriginal?o("span",{class:"page-original-info"},t.value.origin):null}}),q4=R({name:"ReadingTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(e){const t=ln(),n=x(()=>{if(!e.readingTime)return null;const{minutes:r}=e.readingTime;return r<1?"PT1M":`PT${Math.round(r)}M`});return()=>{var r,l;return(r=e.readingTimeLocale)!=null&&r.time?o("span",{class:"page-reading-time-info","aria-label":`${t.value.readingTime}${e.pure?"":"⌛"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[o(ad),o("span",(l=e.readingTimeLocale)==null?void 0:l.time),o("meta",{property:"timeRequired",content:n.value})]):null}}}),K4=R({name:"TagInfo",inheritAttrs:!1,props:{tag:{type:Array,default:()=>[]},pure:Boolean},setup(e){const t=Dt(),n=he(),r=ln(),l=(a,s="")=>{s&&n.value.path!==s&&(a.preventDefault(),t.push(s))};return()=>e.tag.length?o("span",{class:"page-tag-info","aria-label":`${r.value.tag}${e.pure?"":"🏷"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[o(ld),e.tag.map(({name:a,path:s})=>o("span",{class:["page-tag-item",{[`tag${Sl(a,9)}`]:!e.pure,clickable:s}],role:s?"navigation":"",onClick:i=>l(i,s)},a)),o("meta",{property:"keywords",content:e.tag.map(({name:a})=>a).join(",")})]):null}}),Z4=R({name:"ReadTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(e){const t=ln();return()=>{var n,r,l;return(n=e.readingTimeLocale)!=null&&n.words?o("span",{class:"page-word-info","aria-label":`${t.value.words}${e.pure?"":"🔠"}`,...e.pure?{}:{"data-balloon-pos":"down"}},[o(sd),o("span",(r=e.readingTimeLocale)==null?void 0:r.words),o("meta",{property:"wordCount",content:(l=e.readingTime)==null?void 0:l.words})]):null}}}),od=R({name:"PageInfo",components:{AuthorInfo:F4,CategoryInfo:G4,DateInfo:W4,OriginalInfo:U4,PageViewInfo:()=>null,ReadingTimeInfo:q4,TagInfo:K4,WordInfo:Z4},props:{items:{type:[Array,Boolean],default:()=>["Author","Original","Date","PageView","ReadingTime","Category","Tag"]},info:{type:Object,required:!0}},setup(e){const t=_n();return()=>e.items?o("div",{class:"page-info"},e.items.map(n=>o(ut(`${n}Info`),{...e.info,pure:t.value}))):null}}),Y4=R({name:"PrintButton",setup(){const e=Nt(),t=oe();return()=>e.value.print===!1?null:o("button",{type:"button",class:"print-button",title:t.value.metaLocales.print,onClick:()=>{window.print()}},o(rd))}});const X4=({title:e,level:t,slug:n})=>o(Pe,{to:`#${n}`,class:["toc-link",`level${t}`]},()=>e),Pa=(e,t)=>{const n=Ct();return e.length&&t>0?o("ul",{class:"toc-list"},e.map(r=>{const l=Pa(r.children,t-1);return[o("li",{class:["toc-item",{active:n.hash===`#${r.slug}`}]},X4(r)),l?o("li",l):null]})):null};var id=R({name:"TOC",props:{items:{type:Array,default:()=>[]},headerDepth:{type:Number,default:2}},slots:Object,setup(e,{slots:t}){const n=Ct(),r=he(),l=ln(),a=Te(),s=W("-1.7rem"),i=c=>{var d;(d=a.value)==null||d.scrollTo({top:c,behavior:"smooth"})},u=()=>{if(a.value){const c=document.querySelector(".toc-item.active");c?s.value=`${c.getBoundingClientRect().top-a.value.getBoundingClientRect().top+a.value.scrollTop}px`:s.value="-1.7rem"}else s.value="-1.7rem"};return fe(()=>{le(()=>n.hash,c=>{if(a.value){const d=document.querySelector(`#toc a.toc-link[href$="${c}"]`);if(!d)return;const{top:p,height:f}=a.value.getBoundingClientRect(),{top:h,height:v}=d.getBoundingClientRect();h<p?i(a.value.scrollTop+h-p):h+v>p+f&&i(a.value.scrollTop+h+v-p-f)}}),le(()=>n.fullPath,u,{flush:"post",immediate:!0})}),()=>{var d,p;const c=e.items.length?Pa(e.items,e.headerDepth):r.value.headers?Pa(r.value.headers,e.headerDepth):null;return c?o("div",{class:"toc-place-holder"},[o("aside",{id:"toc"},[(d=t.before)==null?void 0:d.call(t),o("div",{class:"toc-header"},[l.value.toc,o(Y4)]),o("div",{class:"toc-wrapper",ref:a},[c,o("div",{class:"toc-marker",style:{top:s.value}})]),(p=t.after)==null?void 0:p.call(t)])]):null}}}),Cs=R({name:"SkipLink",props:{content:{type:String,default:"main-content"}},setup(e){const t=he(),n=oe(),r=Te(),l=({target:a})=>{const s=document.querySelector(a.hash);if(s){const i=()=>{s.removeAttribute("tabindex"),s.removeEventListener("blur",i)};s.setAttribute("tabindex","-1"),s.addEventListener("blur",i),s.focus(),window.scrollTo(0,0)}};return fe(()=>{le(()=>t.value.path,()=>r.value.focus())}),()=>[o("span",{ref:r,tabindex:"-1"}),o("a",{href:`#${e.content}`,class:"vp-skip-link sr-only",onClick:l},n.value.routeLocales.skipToContent)]}});let sa=null,er=null;const J4={wait:()=>sa,pending:()=>{sa=new Promise(e=>{er=e})},resolve:()=>{er==null||er(),sa=null,er=null}},cd=()=>J4;var ud=R({name:"FadeSlideY",slots:Object,setup(e,{slots:t}){const{resolve:n,pending:r}=cd();return()=>o(Qt,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:n,onBeforeLeave:r},()=>{var l;return(l=t.default)==null?void 0:l.call(t)})}});const Q4=(e,t)=>{const n=e.replace(t,"/").split("/"),r=[];let l=rs(t);return n.forEach((a,s)=>{s!==n.length-1?(l+=`${a}/`,r.push({link:l,name:a||"Home"})):a!==""&&(l+=a,r.push({link:l,name:a}))}),r},dd=(e,{slots:t})=>{var p,f;const{bgImage:n,bgImageDark:r,bgImageStyle:l,color:a,description:s,image:i,imageDark:u,header:c,features:d=[]}=e;return o("div",{class:"vp-feature-wrapper"},[n?o("div",{class:["vp-feature-bg",{light:r}],style:[{"background-image":`url(${n})`},l]}):null,r?o("div",{class:"vp-feature-bg dark",style:[{"background-image":`url(${r})`},l]}):null,o("div",{class:"vp-feature",style:a?{color:a}:{}},[((p=t.image)==null?void 0:p.call(t,e))||[i?o("img",{class:["vp-feature-image",{light:u}],src:Se(i),alt:""}):null,u?o("img",{class:"vp-feature-image dark",src:Se(u),alt:""}):null],((f=t.info)==null?void 0:f.call(t,e))||[c?o("h2",{class:"vp-feature-header"},c):null,s?o("p",{class:"vp-feature-description",innerHTML:s}):null],d.length?o("div",{class:"vp-features"},d.map(({icon:h,title:v,details:w,link:_})=>{const y=[o("h3",{class:"vp-feature-title"},[o(Be,{icon:h}),o("span",{innerHTML:v})]),o("p",{class:"vp-feature-details",innerHTML:w})];return _?br(_)?o("a",{class:"vp-feature-item link",href:_,"aria-label":v,target:"_blank"},y):o(Pe,{class:"vp-feature-item link",to:_,"aria-label":v},()=>y):o("div",{class:"vp-feature-item"},y)})):null])])};dd.displayName="FeaturePanel";var ri=dd,eg=R({name:"HeroInfo",slots:Object,setup(e,{slots:t}){const n=be(),r=Kn(),l=x(()=>n.value.heroFullScreen??!1),a=x(()=>{const{heroText:c,tagline:d}=n.value;return{text:c??r.value.title??"Hello",tagline:d??r.value.description??"",isFullScreen:l.value}}),s=x(()=>{const{heroText:c,heroImage:d,heroImageDark:p,heroAlt:f,heroImageStyle:h}=n.value;return{image:d?Se(d):null,imageDark:p?Se(p):null,heroStyle:h,alt:f||c||"",isFullScreen:l.value}}),i=x(()=>{const{bgImage:c,bgImageDark:d,bgImageStyle:p}=n.value;return{image:Me(c)?Se(c):null,imageDark:Me(d)?Se(d):null,bgStyle:p,isFullScreen:l.value}}),u=x(()=>n.value.actions??[]);return()=>{var c,d,p;return o("header",{class:["vp-hero-info-wrapper",{fullscreen:l.value}]},[((c=t.heroBg)==null?void 0:c.call(t,i.value))||[i.value.image?o("div",{class:["vp-hero-mask",{light:i.value.imageDark}],style:[{"background-image":`url(${i.value.image})`},i.value.bgStyle]}):null,i.value.imageDark?o("div",{class:"vp-hero-mask dark",style:[{"background-image":`url(${i.value.imageDark})`},i.value.bgStyle]}):null],o("div",{class:"vp-hero-info"},[((d=t.heroImage)==null?void 0:d.call(t,s.value))||o(pe,{appear:!0,type:"group"},()=>[s.value.image?o("img",{key:"light",class:["vp-hero-image",{light:s.value.imageDark}],style:s.value.heroStyle,src:s.value.image,alt:s.value.alt}):null,s.value.imageDark?o("img",{key:"dark",class:"vp-hero-image dark",style:s.value.heroStyle,src:s.value.imageDark,alt:s.value.alt}):null]),((p=t.heroInfo)==null?void 0:p.call(t,a.value))??o("div",{class:"vp-hero-infos"},[a.value.text?o(pe,{appear:!0,delay:.04},()=>o("h1",{id:"main-title"},a.value.text)):null,a.value.tagline?o(pe,{appear:!0,delay:.08},()=>o("p",{id:"main-description",innerHTML:a.value.tagline})):null,u.value.length?o(pe,{appear:!0,delay:.12},()=>o("p",{class:"vp-hero-actions"},u.value.map(f=>o(Ke,{class:["vp-hero-action",f.type||"default"],config:f,noExternalLinkIcon:!0},f.icon?{before:()=>o(Be,{icon:f.icon})}:{})))):null])])])}}});const pd=(e,{slots:t})=>{var f,h,v;const{bgImage:n,bgImageDark:r,bgImageStyle:l,color:a,description:s,image:i,imageDark:u,header:c,highlights:d=[],type:p="un-order"}=e;return o("div",{class:"vp-highlight-wrapper",style:a?{color:a}:{}},[n?o("div",{class:["vp-highlight-bg",{light:r}],style:[{"background-image":`url(${n})`},l]}):null,r?o("div",{class:"vp-highlight-bg dark",style:[{"background-image":`url(${r})`},l]}):null,o("div",{class:"vp-highlight"},[((f=t.image)==null?void 0:f.call(t,e))||[i?o("img",{class:["vp-highlight-image",{light:u}],src:Se(i),alt:""}):null,u?o("img",{class:"vp-highlight-image dark",src:Se(u),alt:""}):null],((h=t.info)==null?void 0:h.call(t,e))||[o("div",{class:"vp-highlight-info-wrapper"},o("div",{class:"vp-highlight-info"},[c?o("h2",{class:"vp-highlight-header",innerHTML:c}):null,s?o("p",{class:"vp-highlight-description",innerHTML:s}):null,((v=t.highlights)==null?void 0:v.call(t,d))||o(p==="order"?"ol":p==="no-order"?"dl":"ul",{class:"vp-highlights"},d.map(({icon:w,title:_,details:y,link:S})=>{const b=[o(p==="no-order"?"dt":"h3",{class:"vp-highlight-title"},[w?o(Be,{class:"vp-highlight-icon",icon:w}):null,o("span",{innerHTML:_})]),y?o(p==="no-order"?"dd":"p",{class:"vp-highlight-details",innerHTML:y}):null];return o(p==="no-order"?"div":"li",{class:["vp-highlight-item-wrapper",{link:S}]},S?br(S)?o("a",{class:"vp-highlight-item link",href:S,"aria-label":_,target:"_blank"},b):o(Pe,{class:"vp-highlight-item link",to:S,"aria-label":_},()=>b):o("div",{class:"vp-highlight-item"},b))}))]))]])])};pd.displayName="HighlightPanel";var tg=pd,ng=R({name:"HomePage",slots:Object,setup(e,{slots:t}){const n=_n(),r=be(),l=x(()=>{const{features:s}=r.value;return Ca(s)?s:null}),a=x(()=>{const{highlights:s}=r.value;return Ca(s)?s:null});return()=>{var s,i,u,c;return o("main",{id:"main-content",class:["vp-project-home ",{pure:n.value}],"aria-labelledby":r.value.heroText===null?"":"main-title"},[(s=t.top)==null?void 0:s.call(t),o(eg),((i=a.value)==null?void 0:i.map(d=>"features"in d?o(ri,d):o(tg,d)))||(l.value?o(pe,{appear:!0,delay:.24},()=>o(ri,{features:l.value})):null),(u=t.center)==null?void 0:u.call(t),o(pe,{appear:!0,delay:.32},()=>o(Es)),(c=t.bottom)==null?void 0:c.call(t)])}}}),rg=R({name:"BreadCrumb",setup(){const e=he(),t=Lt(),n=be(),r=oe(),l=Te([]),a=x(()=>(n.value.breadcrumb||n.value.breadcrumb!==!1&&r.value.breadcrumb!==!1)&&l.value.length>1),s=x(()=>n.value.breadcrumbIcon||n.value.breadcrumbIcon!==!1&&r.value.breadcrumbIcon!==!1),i=()=>{const u=Q4(e.value.path,t.value).map(({link:c,name:d})=>{const{path:p,meta:f}=Zn(c);return f?{title:f[ye.shortTitle]||f[ye.title]||d,icon:f[ye.icon],path:p}:null}).filter(c=>c!==null);u.length>1&&(l.value=u)};return fe(()=>{le(()=>e.value.path,i,{immediate:!0})}),()=>o("nav",{class:["vp-breadcrumb",{disable:!a.value}]},a.value?o("ol",{vocab:"https://schema.org/",typeof:"BreadcrumbList"},l.value.map((u,c)=>o("li",{class:{"is-active":l.value.length-1===c},property:"itemListElement",typeof:"ListItem"},[o(Pe,{to:u.path,property:"item",typeof:"WebPage"},()=>[s.value?o(Be,{icon:u.icon}):null,o("span",{property:"name"},u.title||"Unknown")]),o("meta",{property:"position",content:c+1})]))):[])}});const li=e=>e===!1||qn(e)?e:Me(e)?Dn(e,!0):null,Ma=(e,t,n)=>{const r=e.findIndex(l=>l.link===t);if(r!==-1){const l=e[r+n];return l!=null&&l.link?l:null}for(const l of e)if(l.children){const a=Ma(l.children,t,n);if(a)return a}return null};var lg=R({name:"PageNav",setup(){const e=oe(),t=be(),n=_s(),r=he(),l=Rr(),a=x(()=>{const i=li(t.value.prev);return i===!1?null:i||(e.value.prevLink===!1?null:Ma(n.value,r.value.path,-1))}),s=x(()=>{const i=li(t.value.next);return i===!1?null:i||(e.value.nextLink===!1?null:Ma(n.value,r.value.path,1))});return Ce("keydown",i=>{i.altKey&&(i.key==="ArrowRight"?s.value&&(l(s.value.link),i.preventDefault()):i.key==="ArrowLeft"&&a.value&&(l(a.value.link),i.preventDefault()))}),()=>a.value||s.value?o("nav",{class:"vp-page-nav"},[a.value?o(Ke,{class:"prev",config:a.value},()=>{var i,u;return[o("div",{class:"hint"},[o("span",{class:"arrow start"}),e.value.metaLocales.prev]),o("div",{class:"link"},[o(Be,{icon:(i=a.value)==null?void 0:i.icon}),(u=a.value)==null?void 0:u.text])]}):null,s.value?o(Ke,{class:"next",config:s.value},()=>{var i,u;return[o("div",{class:"hint"},[e.value.metaLocales.next,o("span",{class:"arrow end"})]),o("div",{class:"link"},[(i=s.value)==null?void 0:i.text,o(Be,{icon:(u=s.value)==null?void 0:u.icon})])]}):null]):null}});const ag={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},sg=({docsRepo:e,docsBranch:t,docsDir:n,filePathRelative:r,editLinkPattern:l})=>{if(!r)return null;const a=Jc(e);let s;return l?s=l:a!==null&&(s=ag[a]),s?s.replace(/:repo/u,tn(e)?e:`https://github.com/${e}`).replace(/:branch/u,t).replace(/:path/u,_c(`${rs(n)}/${r}`)):null},og=()=>{const e=oe(),t=he(),n=be();return x(()=>{const{repo:r,docsRepo:l=r,docsBranch:a="main",docsDir:s="",editLink:i,editLinkPattern:u=""}=e.value;if(!(n.value.editLink??i??!0)||!l)return null;const c=sg({docsRepo:l,docsBranch:a,docsDir:s,editLinkPattern:u,filePathRelative:t.value.filePathRelative});return c?{text:e.value.metaLocales.editLink,link:c}:null})},ig=()=>{const e=Kn(),t=oe(),n=he(),r=be();return x(()=>{var l,a;return!(r.value.lastUpdated??t.value.lastUpdated??!0)||!((l=n.value.git)!=null&&l.updatedTime)?null:new Date((a=n.value.git)==null?void 0:a.updatedTime).toLocaleString(e.value.lang)})},cg=()=>{const e=oe(),t=he(),n=be();return x(()=>{var r;return n.value.contributors??e.value.contributors??!0?((r=t.value.git)==null?void 0:r.contributors)??null:null})};var ug=R({name:"PageTitle",setup(){const e=he(),t=be(),n=oe(),{info:r,items:l}=g4();return()=>o("div",{class:"vp-page-title"},[o("h1",[n.value.titleIcon===!1?null:o(Be,{icon:t.value.icon}),e.value.title]),o(od,{info:r.value,...l.value===null?{}:{items:l.value}}),o("hr")])}});const fd=()=>o(ae,{name:"edit"},()=>[o("path",{d:"M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"}),o("path",{d:"M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"})]);fd.displayName="EditIcon";var dg=R({name:"PageMeta",setup(){const e=oe(),t=og(),n=ig(),r=cg();return()=>{const{metaLocales:l}=e.value;return o("footer",{class:"page-meta"},[t.value?o("div",{class:"meta-item edit-link"},o(Ke,{class:"label",config:t.value},{before:()=>o(fd)})):null,o("div",{class:"meta-item git-info"},[n.value?o("div",{class:"update-time"},[o("span",{class:"label"},`${l.lastUpdated}: `),o(Cl,()=>o("span",{class:"info"},n.value))]):null,r.value&&r.value.length?o("div",{class:"contributors"},[o("span",{class:"label"},`${l.contributors}: `),r.value.map(({email:a,name:s},i)=>[o("span",{class:"contributor",title:`email: ${a}`},s),i!==r.value.length-1?",":""])]):null])])}}}),pg=R({name:"NormalPage",slots:Object,setup(e,{slots:t}){const n=be(),{isDarkmode:r}=$r(),l=oe(),a=x(()=>n.value.toc||n.value.toc!==!1&&l.value.toc!==!1);return()=>o("main",{id:"main-content",class:"vp-page"},o(Et("LocalEncrypt")?ut("LocalEncrypt"):Gc,()=>{var s,i,u,c;return[(s=t.top)==null?void 0:s.call(t),n.value.cover?o("div",{class:"page-cover"},o("img",{src:Se(n.value.cover),alt:"","no-view":""})):null,o(rg),o(ug),a.value?o(id,{headerDepth:n.value.headerDepth??l.value.headerDepth??2},{before:()=>{var d;return(d=t.tocBefore)==null?void 0:d.call(t)},after:()=>{var d;return(d=t.tocAfter)==null?void 0:d.call(t)}}):null,(i=t.contentBefore)==null?void 0:i.call(t),o(Es),(u=t.contentAfter)==null?void 0:u.call(t),o(dg),o(lg),Et("CommentService")?o(ut("CommentService"),{darkmode:r.value}):null,(c=t.bottom)==null?void 0:c.call(t)]}))}}),fg=R({name:"Layout",slots:Object,setup(e,{slots:t}){const n=Nt(),r=oe(),l=he(),a=be(),{isMobile:s}=Or(),i=x(()=>{var u,c;return((u=r.value.blog)==null?void 0:u.sidebarDisplay)||((c=n.value.blog)==null?void 0:c.sidebarDisplay)||"mobile"});return()=>[o(Cs),o(ks,{},{default:()=>{var u;return((u=t.default)==null?void 0:u.call(t))||(a.value.home?o(ng):o(ud,()=>o(pg,{key:l.value.path},{top:()=>{var c;return(c=t.top)==null?void 0:c.call(t)},bottom:()=>{var c;return(c=t.bottom)==null?void 0:c.call(t)},contentBefore:()=>{var c;return(c=t.contentBefore)==null?void 0:c.call(t)},contentAfter:()=>{var c;return(c=t.contentAfter)==null?void 0:c.call(t)},tocBefore:()=>{var c;return(c=t.tocBefore)==null?void 0:c.call(t)},tocAfter:()=>{var c;return(c=t.tocAfter)==null?void 0:c.call(t)}})))},...i.value==="none"?{}:{navScreenBottom:()=>o(ut("BloggerInfo"))},...!s.value&&i.value==="always"?{sidebar:()=>o(ut("BloggerInfo"))}:{}})]}}),hg=R({name:"NotFoundHint",setup(){const e=oe(),t=()=>{const n=e.value.routeLocales.notFoundMsg;return n[Math.floor(Math.random()*n.length)]};return()=>o("div",{class:"not-found-hint"},[o("p",{class:"error-code"},"404"),o("h1",{class:"error-title"},e.value.routeLocales.notFoundTitle),o("p",{class:"error-hint"},t())])}}),gg=R({name:"NotFound",slots:Object,setup(e,{slots:t}){const n=Dt(),r=Lt(),l=oe();return()=>[o(Cs),o(ks,{noSidebar:!0},()=>{var a;return o("main",{id:"main-content",class:"vp-page not-found"},((a=t.default)==null?void 0:a.call(t))||[o(hg),o("div",{class:"actions"},[o("button",{type:"button",class:"action-button",onClick:()=>{window.history.go(-1)}},l.value.routeLocales.back),o("button",{type:"button",class:"action-button",onClick:()=>{n.push(l.value.home??r.value)}},l.value.routeLocales.home)])])})]}});const mg={BiliBili:'<svg xmlns="http://www.w3.org/2000/svg" class="icon bilibili-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1296db"/><path fill="#fff" d="M745.363 177.725a47 47 0 0 1 0 66.3L702.5 286.85h44A141 141 0 0 1 887 427.512v281.25a141 141 0 0 1-141 140.626H277.25A141 141 0 0 1 137 708.763v-281.25a141 141 0 0 1 141-141h43.725l-42.788-42.825a47 47 0 1 1 66.263-66.3l99.45 99.45c2.963 2.962 5.438 6.187 7.425 9.637h120.487c1.988-3.45 4.5-6.75 7.463-9.675l99.413-99.45a47 47 0 0 1 66.3 0zm1.012 203.25h-468.75a47 47 0 0 0-46.763 43.388l-.112 3.525v281.25c0 24.712 19.125 44.962 43.387 46.724l3.488.15h468.75a47 47 0 0 0 46.763-43.387l.112-3.487v-281.25c0-26-21-47-47-46.876zm-375 93.75c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47zm281.25 0c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47z"/></svg>',GitHub:'<svg xmlns="http://www.w3.org/2000/svg" class="icon github-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#171515"/><path fill="#fff" d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z"/></svg>',WechatMP:'<svg xmlns="http://www.w3.org/2000/svg" class="icon wechatmp-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#07C160"/><g fill="#FFF"><path d="M702 338a218 218 0 0 0-359-37c-35 42-46 91-39 140 5 33 24 78 50 106a263 263 0 0 1 348-209"/><path d="M771 445c-54-71-147-90-232-59l9 3a240 240 0 0 1 99 389 214 214 0 0 0 124-333"/><path d="M509 669c-21 0-42-2-62-7-5 0-9 2-14 5l-58 38-5 1c-6 1-10-3-10-8l1-7 11-47v-6c0-6-3-11-8-14a262 262 0 0 1-113-176 227 227 0 0 0 111 338c124 41 242-5 283-110 5-13 10-34 11-52-43 32-89 45-147 45"/></g></svg>',XiaoHongShu:'<svg xmlns="http://www.w3.org/2000/svg" class="icon xiaohongshu-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#FF2E4D"/><path fill="#FFF" d="m257 506-3 31c-2 18-6 35-14 51l-8 12-5-9a3116 3116 0 0 1-15-37c3-7 4-14 4-21l2-27 1-20 3-24c0-2 1-2 2-2h33c2 0 3 1 2 3zm69 85c0 9-5 17-12 23-5 4-11 6-18 6h-17c-2 0-4-1-4-3l-10-22-2-4c-1-4-1-4 3-4h14c6 0 8-2 8-8v-85l1 1v-84c0-4 0-5 4-5h28c6 0 6 1 6 6v149zm74-28-15 33-2 5-8-12-7-19-6-20-2-18-3-45a2404 2404 0 0 0 0-27h34c2 0 3 1 3 3l1 13 1 11 1 16 1 20c2 11 1 21 4 31 1 2-1 6-2 9m82 21-8 20-5 11c-2 4-3 5-8 5h-43l-11-2a3522 3522 0 0 0 12-32l3-7 2-1c12 3 24 3 37 3h19c3 0 4 0 2 3m4-21-3 1h-40c-4 0-9-1-12-4s-5-7-3-12l9-23 12-28h-17c-4-1-9-1-12-5s-4-8-3-12l8-20 8-17 9-20 7-17 4-2h32c4 0 4 0 3 4l-19 42-1 5c0 4 1 5 5 5h29a2438 2438 0 0 0-11 32l-10 20-6 13c-2 4 0 6 4 6h18c2 0 3 1 2 3l-11 25zm132 57H490l2-6 13-30c1-2 3-3 5-3h28c5 0 5 0 5-5V463c0-4 0-4-4-4h-18c-2 0-3-1-3-3v-33c0-3 0-3 3-3h84c2 0 3 0 3 2v34c0 2-1 3-3 3h-19c-2 0-3 1-3 3a12375 12375 0 0 1 0 115c0 4 0 4 4 4h31c3 0 3 1 3 4v32c0 3-1 3-3 3m194-34c0 16-11 29-26 32l-13 2h-20c-4 0-5-1-7-5l-10-23v-2c-2-3-1-3 2-3l28-1c5 0 8-2 8-8v-32c0-6-7-11-12-12h-58c-5 0-5 1-5 6v76c0 4 0 4-4 4h-31c-3 0-4-1-4-4v-79c0-3-1-3-3-3h-30c-7 0-6 1-6-6v-29c0-4 0-4 4-4h31c4 0 4 0 4-4v-29c0-3-1-4-3-4h-20c-2 0-3 0-3-2v-33c0-3 1-4 3-4h19c4 0 4 0 4-4v-8c0-2 1-3 3-3h32c4 0 4 0 4 4v7c0 3 1 4 4 4h17c14 1 26 5 36 16 5 6 8 14 9 22v25l1 9c0 3 0 4 4 4l18 3c13 5 21 14 23 27l1 9zm-9-131c-6 4-12 3-19 3h-8l-2-1c-1-9-2-18 1-26 3-7 10-12 18-12s16 6 18 14c3 8-1 17-8 22"/><path fill="#FF2E4D" d="M721 458h-19c-3 0-3 1-3 4v29c0 3 1 4 4 4h21c3 0 4-1 4-3v-27c-1-4-3-6-7-7"/></svg>'},vg={category:{"/":{path:"/category/",map:{推荐:{path:"/category/推荐/",indexes:[0]},博客:{path:"/category/博客/",indexes:[1,2,3,4,5]},计算机:{path:"/category/计算机/",indexes:[6,7,8]},底层:{path:"/category/底层/",indexes:[6,7,8]},工具:{path:"/category/工具/",indexes:[9,10,11,12]},前端:{path:"/category/前端/",indexes:[13]},编程:{path:"/category/编程/",indexes:[14,15]},笔记:{path:"/category/笔记/",indexes:[16]},资料站:{path:"/category/资料站/",indexes:[17]},"Python 库":{path:"/category/python-库/",indexes:[18,19,20,21]},锦囊:{path:"/category/锦囊/",indexes:[22]}}}},tag:{"/":{path:"/tag/",map:{文章:{path:"/tag/文章/",indexes:[0]},index:{path:"/tag/index/",indexes:[17,3,14]},日志:{path:"/tag/日志/",indexes:[4]},计划:{path:"/tag/计划/",indexes:[1]},问题记录:{path:"/tag/问题记录/",indexes:[5]},笔记:{path:"/tag/笔记/",indexes:[6]},教程:{path:"/tag/教程/",indexes:[18,9,7,8,22,10,11,19,20,21,12,15,13,16]}}}}},hd=["/article/software.html","/blog/schedule.html","/blog/spots.html","/blog/","/blog/log.html","/blog/vuepress.html","/code/Linux.html","/code/shell.html","/code/vim.html","/code/github.html","/code/latex.html","/code/vscode.html","/code/git.html","/code/html.html","/code/","/code/python.html","/code/markdown.html","/credit/","/code/python/websocket.html","/code/python/web_crawler.html","/code/python/Seaborn.html","/code/python/pandas.html","/code/tips/regex.html","/article/CSU.html","/article/baoyan.html","/code/python/pytorch/img.html","/code/python/pytorch/4.6GoogleNet.html","/code/python/pytorch/4.7ResNet.html","/code/python/pytorch/4.4VGG.html","/code/python/pytorch/4.5NiN.html","/code/python/pytorch/4.3AlexNet.html","/code/python/pytorch/4.1convolutional_nn_basic.html","/code/python/pytorch/4.2LeNet.html","/code/python/pytorch/2.4MLP.html","/code/python/pytorch/3.1Deeplearning_basic.html","/code/python/pytorch/2.1linear_regression.html","/code/python/pytorch/2.2FashionMNIST.html","/code/python/pytorch/2.3softmax.html","/article/external.html","/article/","/code/python/pytorch/1pytorch.html","/article/article.html","/english/china/10.22.html","/english/china/10.23.html","/english/china/10.24.html","/english/china/10.25.html","/english/china/10.26.html","/english/china/10.27.html","/english/china/10.28.html","/english/china/10.29.html","/english/china/10.30.html","/english/china/10.31.html","/english/china/11.1.html","/english/china/11.2.html","/english/free/1.html","/english/free/2.html","/english/free/3.html","/english/free/4.html","/english/free/5.html","/english/free/6.html","/english/free/7.html","/english/free/8.html","/english/free/9.html","/english/video/1.html","/english/video/2.html","/english/video/3.html","/english/video/4.html","/english/video/5.html","/english/video/6.html","/english/video/7.html","/english/video/8.html","/english/video/9.html","/intro.html","/article/CPC.html","/article/film_recommend.html","/article/hamlet.html","/article/read.html","/article/weakness.html","/article/web.html"],yg=Te(vg),ai=en(yg),gd=e=>{const t=he(),n=be(),r=Lt();return x(()=>{var i;const l=e??((i=n.value.blog)==null?void 0:i.key)??"";if(!l)return console.warn("useBlogCategory: key not found"),{path:"/",map:{}};if(!ai.value[l])throw new Error(`useBlogCategory: key ${l} is invalid`);const a=ai.value[l][r.value],s={path:a.path,map:{}};for(const u in a.map){const c=a.map[u];s.map[u]={path:c.path,items:[]};for(const d of c.indexes){const{path:p,meta:f}=Zn(hd[d]);s.map[u].items.push({path:p,info:f})}t.value.path===c.path&&(s.currentItems=s.map[u].items)}return s})},bg={article:{"/":{path:"/article/",indexes:[23,24,25,18,9,26,27,28,29,6,30,31,32,33,34,17,35,36,37,38,39,0,7,8,22,40,41,1,2,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,3,14,10,72,73,74,75,76,77,78,4,11,19,20,21,12,15,13,16,5]}},star:{"/":{path:"/star/",indexes:[]}},timeline:{"/":{path:"/timeline/",indexes:[23,24,25,18,9,26,27,28,29,6,30,31,32,33,34,17,35,36,37,38,39,0,7,8,22,40,41,1,2,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,3,14,10,72,73,74,75,76,77,78,4,11,19,20,21,12,15,13,16,5]}}},xg=Te(bg),si=en(xg),Pl=e=>{const t=be(),n=Lt();return x(()=>{var s;const r=e??((s=t.value.blog)==null?void 0:s.key)??"";if(!r)return console.warn("useBlogType: key not found"),{path:"/",items:[]};if(!si.value[r])throw new Error(`useBlogType: key ${e} is invalid`);const l=si.value[r][n.value],a={path:l.path,items:[]};for(const i of l.indexes){const{path:u,meta:c}=Zn(hd[i]);a.items.push({path:u,info:c})}return a})},Ts=()=>o(ae,{name:"lock"},()=>o("path",{d:"M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"}));Ts.displayName="LockIcon";var wg=[];const md=Symbol.for("categoryMap"),Dr=()=>{const e=me(md);if(!e)throw new Error("useCategoryMap() is called without provider.");return e},_g=()=>{const e=gd("category");dt(md,e)},Nr=()=>{const e=Nt(),t=oe();return x(()=>({...e.value.blog,...t.value.blog}))},vd=Symbol.for("tagMap"),jr=()=>{const e=me(vd);if(!e)throw new Error("useTagMap() is called without provider.");return e},kg=()=>{const e=gd("tag");dt(vd,e)},Eg=e=>{const t=oe();return x(()=>{const{[ye.author]:n}=e.value;return n?kr(n):n===!1?[]:kr(t.value.author,!1)})},Cg=e=>{const t=Dr();return x(()=>tu(e.value[ye.category]).map(n=>({name:n,path:t.value.map[n].path})))},Tg=e=>{const t=jr();return x(()=>nu(e.value[ye.tag]).map(n=>({name:n,path:t.value.map[n].path})))},Lg=e=>x(()=>{const{[ye.date]:t}=e.value;return cs(t)}),Sg=e=>{const t=Un(e,"info"),n=Nr(),r=Eg(t),l=Cg(t),a=Tg(t),s=Lg(t),i=Mu(),u=x(()=>({author:r.value,category:l.value,date:s.value,localizedDate:t.value[ye.localizedDate]||"",tag:a.value,isOriginal:t.value[ye.isOriginal]||!1,readingTime:t.value[ye.readingTime]||null,readingTimeLocale:t.value[ye.readingTime]&&i.value?Pu(t.value[ye.readingTime],i.value):null,pageview:e.path})),c=x(()=>n.value.articleInfo);return{info:u,items:c}},yd=Symbol(""),Vr=()=>{const e=me(yd);if(!e)throw new Error("useArticles() is called without provider.");return e},Ag=()=>{const e=Pl("article");dt(yd,e)},bd=Symbol(""),Ls=()=>{const e=me(bd);if(!e)throw new Error("useStars() is called without provider.");return e},Ig=()=>{const e=Pl("star");dt(bd,e)},xd=Symbol(""),Ss=()=>{const e=me(xd);if(!e)throw new Error("useTimelines() is called without provider.");return e},Pg=()=>{const e=Pl("timeline"),t=x(()=>{const n=[];return e.value.items.forEach(({info:r,path:l})=>{const a=cs(r[ye.date]);if(a){const s=a.getFullYear(),i=a.getMonth()+1,u=a.getDate();(!n[0]||n[0].year!==s)&&n.unshift({year:s,items:[]}),n[0].items.push({date:`${i}/${u}`,info:r,path:l})}}),{...e.value,config:n.reverse()}});dt(xd,t)},Mg=()=>{Ag(),_g(),Ig(),kg(),Pg()};var Rg=R({name:"SocialMedia",setup(){const e=Nr(),t=_n(),n=x(()=>{const r=e.value.medias;return r?xn(r).map(([l,a])=>({name:l,icon:mg[l],url:a})):[]});return()=>n.value.length?o("div",{class:"vp-social-medias"},n.value.map(({name:r,icon:l,url:a})=>o("a",{class:"vp-social-media",href:a,rel:"noopener noreferrer",target:"_blank","aria-label":r,...t.value?{}:{"data-balloon-pos":"up"},innerHTML:l}))):null}}),As=R({name:"BloggerInfo",setup(){const e=Nr(),t=Kn(),n=oe(),r=Vr(),l=Dr(),a=jr(),s=Ss(),i=Rr(),u=x(()=>{var f;return e.value.name||((f=kr(n.value.author)[0])==null?void 0:f.name)||t.value.title}),c=x(()=>e.value.avatar||n.value.logo),d=x(()=>n.value.blogLocales),p=x(()=>e.value.intro);return()=>{const{article:f,category:h,tag:v,timeline:w}=d.value,_=[[r.value.path,r.value.items.length,f],[l.value.path,tt(l.value.map).length,h],[a.value.path,tt(a.value.map).length,v],[s.value.path,s.value.items.length,w]];return o("div",{class:"vp-blogger-info",vocab:"https://schema.org/",typeof:"Person"},[o("div",{class:"vp-blogger",...p.value?{style:{cursor:"pointer"},"aria-label":d.value.intro,"data-balloon-pos":"down",role:"link",onClick:()=>i(p.value)}:{}},[c.value?o("img",{class:["vp-blogger-avatar",{round:e.value.roundAvatar}],src:Se(c.value),property:"image",alt:"Blogger Avatar",loading:"lazy"}):null,u.value?o("div",{class:"vp-blogger-name",property:"name"},u.value):null,e.value.description?o("div",{class:"vp-blogger-description",innerHTML:e.value.description}):null,p.value?o("meta",{property:"url",content:Se(p.value)}):null]),o("div",{class:"vp-blog-counts"},_.map(([y,S,b])=>o(Pe,{class:"vp-blog-count",to:y},()=>[o("div",{class:"count"},S),o("div",b)]))),o(Rg)])}}});const Is=()=>o(ae,{name:"category"},()=>o("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));Is.displayName="CategoryIcon";const Ps=()=>o(ae,{name:"tag"},()=>o("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));Ps.displayName="TagIcon";const Ms=()=>o(ae,{name:"timeline"},()=>o("path",{d:"M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"}));Ms.displayName="TimelineIcon";const wd=()=>o(ae,{name:"slides"},()=>o("path",{d:"M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"}));wd.displayName="SlideIcon";const _d=()=>o(ae,{name:"sticky"},()=>[o("path",{d:"m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"})]);_d.displayName="StickyIcon";const Ml=()=>o(ae,{name:"article"},()=>o("path",{d:"M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"}));Ml.displayName="ArticleIcon";const kd=()=>o(ae,{name:"book"},()=>o("path",{d:"M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"}));kd.displayName="BookIcon";const Ed=()=>o(ae,{name:"link"},()=>o("path",{d:"M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"}));Ed.displayName="LinkIcon";const Cd=()=>o(ae,{name:"project"},()=>o("path",{d:"M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"}));Cd.displayName="ProjectIcon";const Td=()=>o(ae,{name:"friend"},()=>o("path",{d:"M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"}));Td.displayName="FriendIcon";const Ra=()=>o(ae,{name:"slide-down"},()=>o("path",{d:"M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"}));Ra.displayName="SlideDownIcon";const Ld=()=>o("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",class:"empty-icon",viewBox:"0 0 1024 1024",innerHTML:'<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'});Ld.displayName="EmptyIcon";var Og=R({name:"ArticleItem",props:{info:{type:Object,required:!0},path:{type:String,required:!0}},slots:Object,setup(e,{slots:t}){const n=Un(e,"info"),{info:r,items:l}=Sg(e);return()=>{var f,h,v;const{[ye.title]:a,[ye.type]:s,[ye.isEncrypted]:i=!1,[ye.cover]:u,[ye.excerpt]:c,[ye.sticky]:d}=n.value,p=r.value;return o("div",{class:"vp-article-wrapper"},o("article",{class:"vp-article-item",vocab:"https://schema.org/",typeof:"Article"},[((f=t.cover)==null?void 0:f.call(t,{cover:u}))||(u?[o("img",{class:"vp-article-cover",src:Se(u),loading:"lazy"}),o("meta",{property:"image",content:Se(u)})]:[]),d?o(_d):null,o(Pe,{to:e.path},()=>{var w;return((w=t.title)==null?void 0:w.call(t,{title:a,isEncrypted:i,type:s}))||o("header",{class:"vp-article-title"},[i?o(Ts):null,s===Vu.slide?o(wd):null,o("span",{property:"headline"},a)])}),((h=t.excerpt)==null?void 0:h.call(t,{excerpt:c}))||(c?o("div",{class:"vp-article-excerpt",innerHTML:c}):null),o("hr",{class:"vp-article-hr"}),((v=t.info)==null?void 0:v.call(t,{info:p}))||o(od,{info:p,...l.value?{items:l.value}:{}})]))}}}),$g=R({name:"Pagination",props:{total:{type:Number,default:10},perPage:{type:Number,default:10},current:{type:Number,default:1}},emits:["updateCurrentPage"],setup(e,{emit:t}){let n;const r=oe(),l=W(""),a=x(()=>r.value.paginationLocales),s=x(()=>Math.ceil(e.total/e.perPage)),i=x(()=>!!s.value&&s.value!==1),u=x(()=>s.value<7?!1:e.current>4),c=x(()=>s.value<7?!1:e.current<s.value-3),d=x(()=>{const{current:h}=e;let v=1,w=s.value;const _=[];s.value>=7&&(h<=4&&h<s.value-3?(v=1,w=5):h>4&&h>=s.value-3?(w=s.value,v=s.value-4):s.value>7&&(v=h-2,w=h+2));for(let y=v;y<=w;y++)_.push(y);return _}),p=h=>t("updateCurrentPage",h),f=h=>{const v=parseInt(h,10);v<=s.value&&v>0?p(v):n.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${a.value.errorText.replace(/\$page/gu,s.value.toString())}`)};return fe(()=>{n=new v3}),()=>o("div",{class:"vp-pagination"},i.value?o("nav",{class:"vp-pagination-list"},[o("div",{class:"vp-pagination-number "},[e.current>1?o("div",{class:"prev",role:"navigation",unselectable:"on",onClick:()=>p(e.current-1)},a.value.prev):null,u.value?[o("div",{role:"navigation",onClick:()=>p(1)},1),o("div",{class:"ellipsis"},"...")]:null,d.value.map(h=>o("div",{key:h,class:{active:e.current===h},role:"navigation",onClick:()=>p(h)},h)),c.value?[o("div",{class:"ellipsis"},"..."),o("div",{role:"navigation",onClick:()=>p(s.value)},s.value)]:null,e.current<s.value?o("div",{class:"next",role:"navigation",unselectable:"on",onClick:()=>p(e.current+1)},a.value.next):null]),o("div",{class:"vp-pagination-nav"},[o("label",{for:"navigation-text"},`${a.value.navigate}: `),o("input",{id:"navigation-text",value:l.value,onInput:({target:h})=>{l.value=h.value},onKeydown:h=>{h.key==="Enter"&&(h.preventDefault(),f(l.value))}}),o("button",{class:"vp-pagination-button",role:"navigation",title:a.value.action,onClick:()=>f(l.value)},a.value.action)])]):[])}}),Rs=R({name:"ArticleList",props:{items:{type:Array,default:()=>[]}},setup(e){const t=Ct(),n=Dt(),r=Nr(),l=W(1),a=x(()=>r.value.articlePerPage||10),s=x(()=>e.items.slice((l.value-1)*a.value,l.value*a.value)),i=async u=>{l.value=u;const c={...t.query};!(c.page===u.toString()||u===1&&!c.page)&&(u===1?delete c.page:c.page=u.toString(),await n.push({path:t.path,query:c}))};return fe(()=>{const{page:u}=t.query;i(u?Number(u):1),le(l,()=>{const c=document.querySelector("#article-list").getBoundingClientRect().top+window.scrollY;setTimeout(()=>{window.scrollTo(0,c)},100)})}),()=>o("div",{id:"article-list",class:"vp-article-list",role:"feed"},s.value.length?[...s.value.map(({info:u,path:c},d)=>o(pe,{appear:!0,delay:d*.04},()=>o(Og,{key:c,info:u,path:c}))),o($g,{current:l.value,perPage:a.value,total:e.items.length,onUpdateCurrentPage:i})]:o(Ld))}}),Sd=R({name:"CategoryList",setup(){const e=he(),t=Dr();return()=>o("ul",{class:"vp-category-list"},xn(t.value.map).sort(([,n],[,r])=>r.items.length-n.items.length).map(([n,{path:r,items:l}])=>o("li",{class:["vp-category",`vp-category${Sl(n,9)}`,{active:r===e.value.path}]},o(Pe,{to:r},()=>[n,o("span",{class:"count"},l.length)]))))}}),Ad=R({name:"TagList",setup(){const e=be(),t=jr(),n=r=>{var l;return r===((l=e.value.blog)==null?void 0:l.name)};return()=>o("ul",{class:"tag-list-wrapper"},xn(t.value.map).sort(([,r],[,l])=>l.items.length-r.items.length).map(([r,{path:l,items:a}])=>o("li",{class:["tag",`tag${Sl(r,9)}`,{active:n(r)}]},o(Pe,{to:l},()=>[r,o("span",{class:"tag-num"},a.length)]))))}}),Dg=R({name:"TimelineList",setup(){const e=oe(),t=Ss(),n=Rr(),r=x(()=>e.value.blogLocales.timeline);return()=>o("div",{class:"timeline-list-wrapper"},[o("div",{class:"timeline-list-title",onClick:()=>n(t.value.path)},[o(Ms),o("span",{class:"num"},t.value.items.length),r.value]),o("hr"),o("div",{class:"timeline-content"},o("ul",{class:"timeline-list"},t.value.config.map(({year:l,items:a},s)=>o(pe,{appear:!0,delay:.08*(s+1)},()=>o("li",[o("h3",{class:"timeline-year"},l),o("ul",{class:"timeline-year-wrapper"},a.map(({date:i,info:u,path:c})=>o("li",{class:"timeline-item"},[o("span",{class:"timeline-date"},i),o(Pe,{class:"timeline-title",to:c},()=>u[ye.title])])))])))))])}});const Ng={article:Ml,category:Is,tag:Ps,timeline:Ms};var Id=R({name:"InfoList",setup(){const e=oe(),t=Vr(),n=Dr(),r=x(()=>tt(n.value.map).length),l=Ls(),a=jr(),s=x(()=>tt(a.value.map).length),i=Rr(),u=W("article"),c=x(()=>e.value.blogLocales);return()=>o("div",{class:"vp-blog-infos"},[o("div",{class:"vp-blog-type-switcher"},xn(Ng).map(([d,p])=>o("button",{type:"button",class:"vp-blog-type-button",onClick:()=>{u.value=d}},o("div",{class:["icon-wrapper",{active:u.value===d}],"aria-label":c.value[d],"data-balloon-pos":"up"},o(p))))),o(pe,()=>u.value==="article"?o("div",{class:"vp-star-article-wrapper"},[o("div",{class:"title",onClick:()=>i(t.value.path)},[o(Ml),o("span",{class:"num"},t.value.items.length),c.value.article]),o("hr"),l.value.items.length?o("ul",{class:"vp-star-articles"},l.value.items.map(({info:d,path:p},f)=>o(pe,{appear:!0,delay:.08*(f+1)},()=>o("li",{class:"vp-star-article"},o(Pe,{to:p},()=>d[ye.title]))))):o("div",{class:"vp-star-article-empty"},c.value.empty.replace("$text",c.value.star))]):u.value==="category"?o("div",{class:"vp-category-wrapper"},[r.value?[o("div",{class:"title",onClick:()=>i(n.value.path)},[o(Is),o("span",{class:"num"},r.value),c.value.category]),o("hr"),o(pe,{delay:.04},()=>o(Sd))]:o("div",{class:"vp-category-empty"},c.value.empty.replace("$text",c.value.category))]):u.value==="tag"?o("div",{class:"vp-tag-wrapper"},[s.value?[o("div",{class:"title",onClick:()=>i(a.value.path)},[o(Ps),o("span",{class:"num"},s.value),c.value.tag]),o("hr"),o(pe,{delay:.04},()=>o(Ad))]:o("div",{class:"vp-tag-empty"},c.value.empty.replace("$text",c.value.tag))]):o(pe,()=>o(Dg)))])}}),Rl=R({name:"BlogWrapper",slots:Object,setup(e,{slots:t}){const{isMobile:n}=Or();return()=>[o(Cs),o(ks,{noSidebar:!0,noToc:!0},{default:()=>t.default(),navScreenBottom:()=>o(As),...n.value?{sidebar:()=>o(Id)}:{}})]}});const Pd=()=>o("aside",{class:"vp-blog-info-wrapper"},[o(pe,()=>o(As)),o(pe,{delay:.04},()=>o(Id))]);Pd.displayName="InfoPanel";var Ol=Pd,jg=R({name:"BlogPage",setup(){const e=he(),t=be(),n=Dr(),r=jr();return()=>{const{key:l="",name:a=""}=t.value.blog||{},s=a?l==="category"?n.value.map[a].items:l==="tag"?r.value.map[a].items:[]:[];return o(Rl,()=>o("div",{class:"vp-page vp-blog"},o("div",{class:"blog-page-wrapper"},[o("main",{id:"main-content",class:"vp-blog-main"},[o(pe,()=>l==="category"?o(Sd):l==="tag"?o(Ad):null),a?o(pe,{appear:!0,delay:.24},()=>o(Rs,{key:e.value.path,items:s})):null]),o(pe,{delay:.16},()=>o(Ol,{key:"blog"}))])))}}});const Vg="//theme-hope-assets.vuejs.press/hero/default.jpg";var Hg=R({name:"BlogHero",slots:Object,setup(e,{slots:t}){const n=be(),r=Kn(),l=Te(),a=x(()=>n.value.heroFullScreen??!1),s=x(()=>{const{heroText:u,heroImage:c,heroImageDark:d,heroAlt:p,heroImageStyle:f,tagline:h}=n.value;return{text:u??r.value.title??"Hello",image:c?Se(c):null,imageDark:d?Se(d):null,heroStyle:f,alt:p||u||"",tagline:h??"",isFullScreen:a.value}}),i=x(()=>{const{bgImage:u,bgImageDark:c,bgImageStyle:d}=n.value;return{image:Me(u)?Se(u):u===!1?null:Vg,imageDark:Me(c)?Se(c):null,bgStyle:d,isFullScreen:a.value}});return()=>{var u,c;return n.value.hero===!1?null:o("div",{ref:l,class:["vp-blog-hero",{fullscreen:a.value,"no-bg":!i.value.image}]},[((u=t.heroBg)==null?void 0:u.call(t,i.value))||[i.value.image?o("div",{class:["vp-blog-mask",{light:i.value.imageDark}],style:[{background:`url(${i.value.image}) center/cover no-repeat`},i.value.bgStyle]}):null,i.value.imageDark?o("div",{class:"vp-blog-mask dark",style:[{background:`url(${i.value.imageDark}) center/cover no-repeat`},i.value.bgStyle]}):null],((c=t.heroInfo)==null?void 0:c.call(t,s.value))||[o(pe,{appear:!0,type:"group",delay:.04},()=>[s.value.image?o("img",{key:"light",class:["vp-blog-hero-image",{light:s.value.imageDark}],style:s.value.heroStyle,src:s.value.image,alt:s.value.alt}):null,s.value.imageDark?o("img",{key:"dark",class:"vp-blog-hero-image dark",style:s.value.heroStyle,src:s.value.imageDark,alt:s.value.alt}):null]),o(pe,{appear:!0,delay:.08},()=>s.value.text?o("h1",{class:"vp-blog-hero-title"},s.value.text):null),o(pe,{appear:!0,delay:.12},()=>s.value.tagline?o("p",{class:"vp-blog-hero-description",innerHTML:s.value.tagline}):null)],s.value.isFullScreen?o("button",{type:"button",class:"slide-down-button",onClick:()=>{window.scrollTo({top:l.value.clientHeight,behavior:"smooth"})}},[o(Ra),o(Ra)]):null])}}});const zg=["link","article","book","project","friend"];var Bg=R({name:"ProjectPanel",components:{ArticleIcon:Ml,BookIcon:kd,FriendIcon:Td,LinkIcon:Ed,ProjectIcon:Cd},props:{items:{type:Array,required:!0}},setup(e){const t=_n(),n=Rr(),r=(l="",a="icon")=>zg.includes(l)?o(ut(`${l}-icon`)):tn(l)?o("img",{class:"vp-project-image",src:l,alt:a}):Tl(l)?o("img",{class:"vp-project-image",src:Se(l),alt:a}):o(Be,{icon:l});return()=>o("div",{class:"vp-project-panel"},e.items.map(({icon:l,link:a,name:s,desc:i},u)=>o("div",{class:["vp-project-card",{[`project${u%9}`]:!t.value}],onClick:()=>n(a)},[r(l,s),o("div",{class:"vp-project-name"},s),o("div",{class:"vp-project-desc"},i)])))}}),Fg=R({name:"BlogHome",setup(){const e=Vr(),t=be(),n=x(()=>t.value.projects??[]);return()=>o("div",{class:"vp-page vp-blog"},[o(Hg),o("div",{class:"blog-page-wrapper"},[o("main",{id:"main-content",class:"vp-blog-main"},[n.value.length?o(pe,{appear:!0,delay:.16},()=>o(Bg,{items:n.value})):null,o(pe,{appear:!0,delay:.24},()=>o(Rs,{items:e.value.items}))]),o(pe,{appear:!0,delay:.16},()=>o(Ol,{key:"blog"}))]),o(pe,{appear:!0,delay:.28},()=>o(Es))])}});const Md=()=>o(Rl,()=>o(Fg));Md.displayName="BlogHomeLayout";var Gg=Md,Wg=R({name:"ArticleType",setup(){const e=he(),t=Lt(),n=oe(),r=Vr(),l=Ls(),a=x(()=>{const s=n.value.blogLocales;return[{text:s.all,path:r.value.path},{text:s.star,path:l.value.path},...wg.map(({key:i,path:u})=>({text:s[i],path:u.replace(/^\//,t.value)}))]});return()=>o("ul",{class:"vp-article-type-wrapper"},a.value.map(s=>o("li",{class:["vp-article-type",{active:s.path===e.value.path}]},o(Pe,{to:s.path},()=>s.text))))}}),Ug=R({name:"BlogPage",setup(){const e=Pl(),t=be(),n=he(),r=Vr(),l=Ls(),a=x(()=>{const{key:s="",type:i}=t.value.blog||{};return s==="star"?l.value.items:i==="type"&&s?e.value.items:r.value.items});return()=>o(Rl,()=>o("div",{class:"vp-page vp-blog"},o("div",{class:"blog-page-wrapper"},[o("main",{id:"main-content",class:"vp-blog-main"},[o(pe,()=>o(Wg)),o(pe,{appear:!0,delay:.24},()=>o(Rs,{key:n.value.path,items:a.value}))]),o(pe,{delay:.16},()=>o(Ol,{key:"blog"}))])))}}),qg=R({name:"TimelineItems",setup(){const e=Nr(),t=oe(),n=Ss(),r=x(()=>e.value.timeline||t.value.blogLocales.timelineTitle),l=x(()=>n.value.config.map(({year:a})=>({title:a.toString(),level:2,slug:a.toString(),children:[]})));return()=>o("div",{class:"timeline-wrapper"},o("ul",{class:"timeline-content"},[o(pe,()=>o("li",{class:"motto"},r.value)),o(id,{items:l.value}),n.value.config.map(({year:a,items:s},i)=>o(pe,{appear:!0,delay:.08*(i+1),type:"group"},()=>[o("h3",{key:"title",id:a,class:"timeline-year-title"},o("span",a)),o("li",{key:"content",class:"timeline-year-list"},[o("ul",{class:"timeline-year-wrapper"},s.map(({date:u,info:c,path:d})=>o("li",{class:"timeline-item"},[o("span",{class:"timeline-date"},u),o(Pe,{class:"timeline-title",to:d},()=>c[ye.title])])))])]))]))}});const Rd=()=>o(Rl,()=>o("div",{class:"vp-page vp-blog"},o("div",{class:"blog-page-wrapper"},[o("main",{id:"main-content",class:"vp-blog-main"},[o(pe,{appear:!0,delay:.24},()=>o(qg))]),o(pe,{delay:.16},()=>o(Ol,{key:"blog"}))])));Rd.displayName="Timeline";var Kg=Rd,Zg={};const Cn="./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),oa=Array.from({length:64},(e,t)=>t),el=e=>Array(e).fill(-1),Bt=[...el(46),0,1,...oa.slice(54,64),...el(7),...oa.slice(2,28),...el(6),...oa.slice(28,54),...el(5)],oi=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],ii=[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946,1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055,3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504,976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462],Od=[1332899944,1700884034,1701343084,1684370003,1668446532,1869963892],Oa=(e,t)=>{if(t<=0||t>e.length)throw Error(`Illegal len: ${t}`);let n=0,r,l;const a=[];for(;n<t;){if(r=e[n++]&255,a.push(Cn[r>>2&63]),r=(r&3)<<4,n>=t){a.push(Cn[r&63]);break}if(l=e[n++]&255,r|=l>>4&15,a.push(Cn[r&63]),r=(l&15)<<2,n>=t){a.push(Cn[r&63]);break}l=e[n++]&255,r|=l>>6&3,a.push(Cn[r&63]),a.push(Cn[l&63])}return a.join("")},Yg=(e,t)=>{if(t<=0)throw Error(`Illegal len: ${t}`);const n=e.length;let r=0,l=0,a,s,i,u,c,d;const p=[];for(;r<n-1&&l<t&&(d=e.charCodeAt(r++),a=d<Bt.length?Bt[d]:-1,d=e.charCodeAt(r++),s=d<Bt.length?Bt[d]:-1,!(a==-1||s==-1||(c=a<<2>>>0,c|=(s&48)>>4,p.push(String.fromCharCode(c)),++l>=t||r>=n)||(d=e.charCodeAt(r++),i=d<Bt.length?Bt[d]:-1,i==-1)||(c=(s&15)<<4>>>0,c|=(i&60)>>2,p.push(String.fromCharCode(c)),++l>=t||r>=n)));)d=e.charCodeAt(r++),u=d<Bt.length?Bt[d]:-1,c=(i&3)<<6>>>0,c|=u,p.push(String.fromCharCode(c)),++l;return p.map(f=>f.charCodeAt(0))},Xg=(e,t)=>{let n=null;for(typeof e=="number"&&(n=e,e=()=>null);n!==null||(n=e())!==null;)n<128?t(n&127):n<2048?(t(n>>6&31|192),t(n&63|128)):n<65536?(t(n>>12&15|224),t(n>>6&63|128),t(n&63|128)):(t(n>>18&7|240),t(n>>12&63|128),t(n>>6&63|128),t(n&63|128)),n=null},Jg=(e,t)=>{let n,r=null;for(;(n=r!==null?r:e())!==null;){if(n>=55296&&n<=57343&&(r=e())!==null&&r>=56320&&r<=57343){t((n-55296)*1024+r-56320+65536),r=null;continue}t(n)}r!==null&&t(r)},Qg=(e,t)=>{Jg(e,function(n){Xg(n,t)})},e6=typeof process=="object"&&Zg.NEXT_RUNTIME==="edge"?setTimeout:typeof setImmediate=="function"?setImmediate:typeof process=="object"&&typeof process.nextTick=="function"?process.nextTick:setTimeout,t6=e=>{const t=[];let n=0;return Qg(()=>n>=e.length?null:e.charCodeAt(n++),r=>{t.push(r)}),t},Er=(e,t,n,r)=>{let l,a=e[t],s=e[t+1];return a^=n[0],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[1],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[2],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[3],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[4],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[5],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[6],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[7],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[8],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[9],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[10],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[11],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[12],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[13],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[14],l=r[a>>>24],l+=r[256|a>>16&255],l^=r[512|a>>8&255],l+=r[768|a&255],s^=l^n[15],l=r[s>>>24],l+=r[256|s>>16&255],l^=r[512|s>>8&255],l+=r[768|s&255],a^=l^n[16],e[t]=s^n[17],e[t+1]=a,e},Ln=(e,t)=>{let n=0;for(let r=0;r<4;++r)n=n<<8|e[t]&255,t=(t+1)%e.length;return{key:n,offp:t}},ci=(e,t,n)=>{const r=t.length,l=n.length;let a=0,s=[0,0],i;for(let u=0;u<r;u++)i=Ln(e,a),a=i.offp,t[u]=t[u]^i.key;for(let u=0;u<r;u+=2)s=Er(s,0,t,n),t[u]=s[0],t[u+1]=s[1];for(let u=0;u<l;u+=2)s=Er(s,0,t,n),n[u]=s[0],n[u+1]=s[1]},n6=(e,t,n,r)=>{const l=n.length,a=r.length;let s=0,i=[0,0],u;for(let c=0;c<l;c++)u=Ln(t,s),s=u.offp,n[c]=n[c]^u.key;s=0;for(let c=0;c<l;c+=2)u=Ln(e,s),s=u.offp,i[0]^=u.key,u=Ln(e,s),s=u.offp,i[1]^=u.key,i=Er(i,0,n,r),n[c]=i[0],n[c+1]=i[1];for(let c=0;c<a;c+=2)u=Ln(e,s),s=u.offp,i[0]^=u.key,u=Ln(e,s),s=u.offp,i[1]^=u.key,i=Er(i,0,n,r),r[c]=i[0],r[c+1]=i[1]},ui=(e,t,n,r,l)=>{const a=Od.slice(),s=a.length;if(n<4||n>31){const f=new Error(`Illegal number of rounds (4-31): ${n}`);if(r===!1)return Promise.reject(f);throw f}if(t.length!==16){const f=new Error(`Illegal salt length: ${t.length} != 16`);if(r===!1)return Promise.reject(f);throw f}n=1<<n>>>0;let i,u,c=0,d;Int32Array?(i=new Int32Array(oi),u=new Int32Array(ii)):(i=oi.slice(),u=ii.slice()),n6(t,e,i,u);const p=()=>{if(l&&l(c/n),c<n){const f=Date.now();for(;c<n&&(c=c+1,ci(e,i,u),ci(t,i,u),!(Date.now()-f>100)););}else{for(c=0;c<64;c++)for(d=0;d<s>>1;d++)Er(a,d<<1,i,u);const f=[];for(c=0;c<s;c++)f.push((a[c]>>24&255)>>>0),f.push((a[c]>>16&255)>>>0),f.push((a[c]>>8&255)>>>0),f.push((a[c]&255)>>>0);return r===!1?Promise.resolve(f):f}if(r===!1)return new Promise(f=>e6(()=>{p().then(f)}))};if(r===!1)return p();{let f;for(;;)if(typeof(f=p())<"u")return f||[]}},r6=e=>{var t;try{const{crypto:n,msCrypto:r}=window,l=new Uint32Array(e);return(t=n||r)==null||t.getRandomValues(l),Array.from(l)}catch{throw Error("WebCryptoAPI is not available")}},l6=(e=10)=>{if(typeof e!="number")throw Error("Illegal arguments: "+typeof e);e<4?e=4:e>31&&(e=31);const t=[];return t.push("$2a$"),e<10&&t.push("0"),t.push(e.toString()),t.push("$"),t.push(Oa(r6(16),16)),t.join("")};function a6(e,t,n,r){if(typeof e!="string"||typeof t!="string"){const h=new Error("Invalid string / salt: Not a string");if(n===!1)return Promise.reject(h);throw h}let l,a;if(t.charAt(0)!=="$"||t.charAt(1)!=="2"){const h=new Error("Invalid salt version: "+t.substring(0,2));if(n===!1)return Promise.reject(h);throw h}if(t.charAt(2)==="$")l="\0",a=3;else{if(l=t.charAt(2),l!=="a"&&l!=="b"&&l!=="y"||t.charAt(3)!=="$"){const h=Error("Invalid salt revision: "+t.substring(2,4));if(n===!1)return Promise.reject(h);throw h}a=4}if(t.charAt(a+2)>"$"){const h=new Error("Missing salt rounds");if(n===!1)return Promise.reject(h);throw h}const s=parseInt(t.substring(a,a+1),10)*10,i=parseInt(t.substring(a+1,a+2),10),u=s+i,c=t.substring(a+3,a+25);e+=l>="a"?"\0":"";const d=t6(e),p=Yg(c,16),f=h=>{const v=[];return v.push("$2"),l>="a"&&v.push(l),v.push("$"),u<10&&v.push("0"),v.push(u.toString()),v.push("$"),v.push(Oa(p,p.length)),v.push(Oa(h,Od.length*4-1)),v.join("")};return n===!1?ui(d,p,u,!1,r).then(h=>f(h)):f(ui(d,p,u,!0,r))}const s6=(e,t=10)=>{if(typeof t=="number"&&(t=l6(t)),typeof e!="string"||typeof t!="string")throw Error("Illegal arguments: "+typeof e+", "+typeof t);return a6(e,t,!0)},$a=(e,t)=>{if(typeof e!="string"||typeof t!="string")throw Error("Illegal arguments: "+typeof e+", "+typeof t);return t.length!==60?!1:s6(e,t.substring(0,t.length-31))===t};var $d=R({name:"PasswordModal",props:{full:Boolean},emits:["verify"],setup(e,{emit:t}){const n=be(),r=oe(),l=W(""),a=W(!1),s=W(!1),i=x(()=>r.value.encryptLocales);let u=null;const c=()=>{u&&clearTimeout(u),a.value=!1,t("verify",l.value,s.value),Ot().then(()=>{a.value=!0,u=setTimeout(()=>{a.value=!1},1e3)})};return()=>o("div",{class:["vp-decrypt-layer",{expand:e.full||n.value.home}]},o("div",{class:"vp-decrypt-modal"},[o("div",{class:["vp-decrypt-hint",{tried:a.value}]},a.value?i.value.errorHint:o(Ts,{"aria-label":i.value.iconLabel})),o("div",{class:"vp-decrypt-input"},[o("input",{type:"password",value:l.value,placeholder:i.value.placeholder,onInput:({target:d})=>{l.value=d.value},onKeydown:({key:d})=>{d==="Enter"&&c()}})]),o("div",{class:"vp-remember-password"},[o("input",{type:"checkbox",value:s.value,onChange:()=>s.value=!s.value}),i.value.remember]),o("button",{type:"button",class:"vp-decrypt-submit",onClick:()=>c()},"OK")]))}});const Dd=()=>{const e=Nt();return x(()=>e.value.encrypt||{})},di="VUEPRESS_HOPE_GLOBAL_TOKEN",o6=()=>{const e=Dd(),t=wn(di,""),n=cu(di,""),r=x(()=>{const{global:a=!1,admin:s=[]}=e.value;return a&&s.length>0}),l=x(()=>{if(r.value){if(t.value)return e.value.admin.some(a=>$a(t.value,a));if(n.value)return e.value.admin.some(a=>$a(n.value,a))}return!1});return{isEncrypted:r,isDecrypted:l,validate:(a,s=!1)=>{(s?t:n).value=a}}},ia=(e="",t)=>!!e&&$a(e,t),pi="VUEPRESS_HOPE_PATH_TOKEN",i6=()=>{const e=he(),t=Dd(),n=wn(pi,{}),r=cu(pi,{}),l=s=>qn(t.value.config)?tt(t.value.config).filter(i=>gn(decodeURI(s),i)).sort((i,u)=>u.length-i.length):[],a=s=>{const i=l(s);if(i.length>0){const{config:u={}}=t.value;return{isEncrypted:!0,isDecrypted:i.some(c=>n.value[c]&&u[c].some(d=>ia(n.value[c],d))||r.value[c]&&u[c].some(d=>ia(r.value[c],d)))}}return{isDecrypted:!1,isEncrypted:!1}};return{status:x(()=>a(e.value.path)),getStatus:a,validate:(s,i=!1)=>{const{config:u={}}=t.value,c=l(e.value.path);for(const d of c)if(u[d].filter(p=>ia(s,p))){(i?n:r).value[d]=s;break}}}};var c6=R({name:"GlobalEncrypt",slots:Object,setup(e,{slots:t}){const{isDecrypted:n,isEncrypted:r,validate:l}=o6(),a=W(!1);return fe(()=>{a.value=!0}),()=>o(ud,()=>r.value?a.value?n.value?t.default():o($d,{full:!0,onVerify:l}):null:t.default())}}),u6=R({name:"LocalEncrypt",slots:Object,setup(e,{slots:t}){const{status:n,validate:r}=i6(),l=W(!1);return fe(()=>{l.value=!0}),()=>{const{isEncrypted:a,isDecrypted:s}=n.value;return a?l.value?s?t.default():o($d,{full:!0,onVerify:r}):null:t.default()}}});af(e=>{const t=e.t,n=e.I!==!1,r=e.i;return n?{title:t,content:r?()=>[o(Be,{icon:r}),t]:null,order:e.O,index:e.I}:null});const d6=nt({enhance:({app:e,router:t})=>{const{scrollBehavior:n}=t.options;t.options.scrollBehavior=async(...r)=>(await cd().wait(),n(...r)),y4(e),e.component("HopeIcon",Be),e.component("BloggerInfo",As),e.component("GlobalEncrypt",c6),e.component("LocalEncrypt",u6)},setup:()=>{b4(),_4(),Mg()},layouts:{Layout:fg,NotFound:gg,BlogCategory:jg,BlogHome:Gg,BlogType:Ug,Timeline:Kg}}),tl=[F0,J3,lf,df,hf,yf,_f,Lf,$f,Uf,_h,Dh,o4,d6],p6=JSON.parse(`{"base":"/","lang":"zh-CN","title":"Dream_oyh 的 blog","description":"穿梭于大千世界的普通人","head":[["link",{"rel":"stylesheet","href":"/mask.css"}],["link",{"rel":"stylesheet","href":"/highlight.css"}],["script",{"async":true,"src":"https://www.googletagmanager.com/gtag/js?id=G-NQR8MZSFKD"}],["script",{},"<!-- Google tag (gtag.js) -->\\n    window.dataLayer = window.dataLayer || [];\\n    function gtag(){dataLayer.push(arguments);}\\n    gtag('js', new Date());\\n    gtag('config', 'G-xxxxxxxx');"],["link",{"rel":"icon","href":"/web_logo.jpg"}]],"locales":{}}`);var nr=Te(p6),f6=Z2,h6=()=>{const e=R0({history:f6(rs("/")),routes:[{name:"vuepress-route",path:"/:catchAll(.*)",components:{}}],scrollBehavior:(t,n,r)=>r||(t.hash?{el:t.hash}:{top:0})});return e.beforeResolve(async(t,n)=>{if(t.path!==n.path||n===Pt){const r=Zn(t.path);if(r.path!==t.path)return r.path;const l=await r.loader();t.meta={...r.meta,_pageChunk:l}}}),e},g6=e=>{e.component("ClientOnly",Cl),e.component("Content",Dc),e.component("RouteLink",Pe)},m6=(e,t,n)=>{const r=x(()=>t.currentRoute.value.path),l=us(r,()=>t.currentRoute.value.meta._pageChunk),a=x(()=>on.resolveLayouts(n)),s=x(()=>on.resolveRouteLocale(nr.value.locales,r.value)),i=x(()=>on.resolveSiteLocaleData(nr.value,s.value)),u=x(()=>l.value.comp),c=x(()=>l.value.data),d=x(()=>c.value.frontmatter),p=x(()=>on.resolvePageHeadTitle(c.value,i.value)),f=x(()=>on.resolvePageHead(p.value,d.value,i.value)),h=x(()=>on.resolvePageLang(c.value,i.value)),v=x(()=>on.resolvePageLayout(c.value,a.value)),w={layouts:a,pageData:c,pageComponent:u,pageFrontmatter:d,pageHead:f,pageHeadTitle:p,pageLang:h,pageLayout:v,redirects:Oc,routeLocale:s,routePath:r,routes:wr,siteData:nr,siteLocaleData:i};return e.provide(ss,w),Object.defineProperties(e.config.globalProperties,{$frontmatter:{get:()=>d.value},$head:{get:()=>f.value},$headTitle:{get:()=>p.value},$lang:{get:()=>h.value},$page:{get:()=>c.value},$routeLocale:{get:()=>s.value},$site:{get:()=>nr.value},$siteLocale:{get:()=>i.value},$withBase:{get:()=>Se}}),w},v6=()=>{const e=D0(),t=os();let n=[];const r=()=>{e.value.forEach(s=>{const i=y6(s);i&&n.push(i)})},l=()=>{const s=[];return e.value.forEach(i=>{const u=b6(i);u&&s.push(u)}),s},a=()=>{document.documentElement.lang=t.value;const s=l();n.forEach((i,u)=>{const c=s.findIndex(d=>i.isEqualNode(d));c===-1?(i.remove(),delete n[u]):s.splice(c,1)}),s.forEach(i=>document.head.appendChild(i)),n=[...n.filter(i=>!!i),...s]};dt(V0,a),fe(()=>{r(),le(e,a,{immediate:!1})})},y6=([e,t,n=""])=>{const r=Object.entries(t).map(([i,u])=>Me(u)?`[${i}=${JSON.stringify(u)}]`:u===!0?`[${i}]`:"").join(""),l=`head > ${e}${r}`;return Array.from(document.querySelectorAll(l)).find(i=>i.innerText===n)||null},b6=([e,t,n])=>{if(!Me(e))return null;const r=document.createElement(e);return qn(t)&&Object.entries(t).forEach(([l,a])=>{Me(a)?r.setAttribute(l,a):a===!0&&r.setAttribute(l,"")}),Me(n)&&r.appendChild(document.createTextNode(n)),r},x6=m2,w6=async()=>{var n;const e=x6({name:"Vuepress",setup(){var a;v6();for(const s of tl)(a=s.setup)==null||a.call(s);const r=tl.flatMap(({rootComponents:s=[]})=>s.map(i=>o(i))),l=N0();return()=>[o(l.value),r]}}),t=h6();g6(e),m6(e,t,tl);for(const r of tl)await((n=r.enhance)==null?void 0:n.call(r,{app:e,router:t,siteData:nr}));return e.use(t),{app:e,router:t}};w6().then(({app:e,router:t})=>{t.isReady().then(()=>{e.mount("#app")})});export{Nh as A,jh as B,qh as C,Wh as D,Te as E,fe as F,yn as G,Me as H,L6 as I,qn as J,lu as K,vs as L,Pe as R,A as _,Ie as a,uc as b,_6 as c,w6 as createVueApp,cc as d,k6 as e,E6 as f,R as g,Dt as h,Lt as i,nn as j,ys as k,Tr as l,W as m,x as n,kp as o,Ce as p,le as q,ut as r,o as s,Un as t,T6 as u,Vh as v,$1 as w,zh as x,Lu as y,Hh as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index.html-C6q077vE.js","assets/plugin-vue_export-helper-DlAUqK2U.js","assets/intro.html-vVbXJlit.js","assets/CPC.html-CVxyQSNG.js","assets/CSU.html-rVqXeG1r.js","assets/article.html-DEIjPYr-.js","assets/baoyan.html-CBUJAi4S.js","assets/external.html-CehWd9p4.js","assets/film_recommend.html-mFK4q8mq.js","assets/hamlet.html-ByvfeqaA.js","assets/index.html-tyPnywCR.js","assets/read.html-DEf7GlRg.js","assets/software.html-BQg42coe.js","assets/weakness.html-XTZoM2VM.js","assets/web.html-D1zc3Npi.js","assets/index.html-DoIjmti_.js","assets/log.html-BNiz7md4.js","assets/schedule.html-CwnP4D8b.js","assets/spots.html-BSv0XfRH.js","assets/vuepress.html-Dw7Fr3Oj.js","assets/Linux.html-7xYEBaYU.js","assets/git.html-aTV6eVml.js","assets/github.html-DnIa3uWu.js","assets/html.html-Dah8SBR8.js","assets/index.html-BSFDu7Cl.js","assets/latex.html-Bdpi0vGR.js","assets/markdown.html-DtMT7afL.js","assets/python.html-CkdkfcIa.js","assets/shell.html-Kn9tS8kY.js","assets/vim.html-Jy6GbKrU.js","assets/vscode.html-lMzF4Nw2.js","assets/index.html-C21kV8Iz.js","assets/Seaborn.html-DYy3U1v1.js","assets/pandas.html-BD4xmsxf.js","assets/web_crawler.html-8l9Hpb6i.js","assets/websocket.html-DrtX6nDz.js","assets/regex.html-BJmGpvSg.js","assets/10.22.html-BPr1Mqhy.js","assets/10.23.html-Do6jKWL4.js","assets/10.24.html-D_h1-h26.js","assets/10.25.html-BaUp33gk.js","assets/10.26.html-CIJfS4PH.js","assets/10.27.html-COBvCVSS.js","assets/10.28.html-B40N_PBO.js","assets/10.29.html-D20E0BgE.js","assets/10.30.html-Dh3oMCmI.js","assets/10.31.html-CpEUqhER.js","assets/11.1.html-PurNzN0e.js","assets/11.2.html-BIvjPBNO.js","assets/1.html-DxPLEmbL.js","assets/2.html-BEjiS0fQ.js","assets/3.html-DmTilcTr.js","assets/4.html-BpeD0fmu.js","assets/5.html-DqiGluy4.js","assets/6.html-DeIHw4fQ.js","assets/7.html-CmqJiUAG.js","assets/8.html-fVRW4tQn.js","assets/9.html-D4XVvXST.js","assets/1.html-dPdaXMqi.js","assets/2.html-pLiJe7hL.js","assets/3.html-CeERrHf9.js","assets/4.html-CEDRZje5.js","assets/5.html-Daev_9wZ.js","assets/6.html-BAqZtHwP.js","assets/7.html-CY0sHzBq.js","assets/8.html-Dhp2FI-P.js","assets/9.html-CdirWuWF.js","assets/1pytorch.html-AgXdLiRl.js","assets/2.1linear_regression.html-8FJuyJTR.js","assets/2.2FashionMNIST.html-BA1gIuon.js","assets/2.3softmax.html-DolAcmC_.js","assets/2.4MLP.html-BAlrNjdW.js","assets/3.1Deeplearning_basic.html-HV6EXDNL.js","assets/4.1convolutional_nn_basic.html-CryQbnmo.js","assets/4.2LeNet.html-DJZf4Wef.js","assets/4.3AlexNet.html-D-o4K_ih.js","assets/4.4VGG.html-DlHRZA03.js","assets/4.5NiN.html-DQ3bJph1.js","assets/4.6GoogleNet.html-BcVFKOuo.js","assets/4.7ResNet.html-BzLLMMqb.js","assets/img.html-DBW7BFka.js","assets/404.html-CROBkEb5.js","assets/index.html-qfMYXHdp.js","assets/index.html-CjU85K0t.js","assets/index.html-D0kwyywN.js","assets/index.html-B5d66F4N.js","assets/index.html-DnFQYfDL.js","assets/index.html-QkaRx9Qn.js","assets/index.html-JCE7DBj7.js","assets/index.html-DJGoxurV.js","assets/index.html-CkznHMdp.js","assets/index.html-Ph45tBZp.js","assets/index.html-Cl0svaMu.js","assets/index.html-CfpnTLzP.js","assets/index.html-CrcZW11-.js","assets/index.html-DXEKbAu2.js","assets/index.html-C2FX06M9.js","assets/index.html-6-JmnUIS.js","assets/index.html-q6hQ-Iah.js","assets/index.html-Y4hgWQLM.js","assets/index.html-ArbKwq8S.js","assets/index.html-CfzJHYY3.js","assets/index.html-CQmZFPWk.js","assets/index.html-CEZ8uMZH.js","assets/index.html-CFGKjhAl.js","assets/index.html-BwpLW5j6.js","assets/index.html-CohGeKcn.js","assets/index.html-CK40B7Kc.js","assets/index.html-brjB2nMK.js","assets/index.html-D2NXedZS.js","assets/index.html-DDkKCAOD.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
