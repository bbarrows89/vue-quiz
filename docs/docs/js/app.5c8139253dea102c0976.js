webpackJsonp([1],{"0i7P":function(e,t){},"4XIU":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("h1",[this._v("Trivia-matic!")]),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"App"},a,!1,function(e){n("4XIU")},null,null).exports,r=n("/ocq"),o=n("//Fk"),c=n.n(o),u=n("mtWM"),l=n.n(u).a.create({baseURL:"//https://opentdb.com/api.php?amount=10"});l.interceptors.request.use(function(e){return e},function(e){return c.a.reject(e)});var v={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h2",[this._v("Loading...")]),this._v(" "),t("div",{staticClass:"sk-folding-cube"},[t("div",{staticClass:"sk-cube1 sk-cube"}),this._v(" "),t("div",{staticClass:"sk-cube2 sk-cube"}),this._v(" "),t("div",{staticClass:"sk-cube4 sk-cube"}),this._v(" "),t("div",{staticClass:"sk-cube3 sk-cube"})])])}]};var d={name:"Quiz",components:{"load-spinner":n("VU/8")({name:"CubeSpinner"},v,!1,function(e){n("0i7P")},"data-v-82700d46",null).exports},data:function(){return{categories:null,currentCategory:9,difficulty:"",questions:[],numQuestions:0,messages:[],showLoading:!1}},created:function(){var e=this;this.$ls.get("categories")?(console.log("Cached categories found."),this.categories=this.$ls.get("categories")):(console.log("No cache available. Making API call"),this.showLoading=!0,l.get("https://opentdb.com/api_category.php").then(function(t){e.$ls.set("categories",t.data.trivia_categories),console.log("Categories have been retrieved and cached."),e.categories=t.data.trivia_categories,e.showLoading=!1}).catch(function(t){e.messages.push({type:"error",text:t.message}),e.showLoading=!1}))},methods:{getQuestions:function(e){}},computed:{getCatNameFromId:function(){console.log("currrent category: "+this.currentCategory);var e=this.currentCategory;return this.categories.find(function(t){return t.id===e}).name}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"quiz"},[n("span",[e._v("Test your trivia knowledge with")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.numQuestions,expression:"numQuestions"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.numQuestions=t.target.multiple?n:n[0]}}},[n("option",{attrs:{selected:"",disabled:"",value:"0"}},[e._v("Please select a number")]),e._v(" "),e._l(20,function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})],2),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.difficulty,expression:"difficulty"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.difficulty=t.target.multiple?n:n[0]}}},[n("option",{attrs:{selected:"",disabled:"",value:""}},[e._v("Select a difficulty")]),e._v(" "),n("option",[e._v("easy")]),e._v(" "),n("option",[e._v("medium")]),e._v(" "),n("option",[e._v("hard")])]),e._v(" "),n("span",[e._v("questions from the following categories: ")]),e._v(" "),e.showLoading?n("load-spinner"):e._e(),e._v(" "),e.categories?n("select",{directives:[{name:"model",rawName:"v-model",value:e.currentCategory,expression:"currentCategory"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.currentCategory=t.target.multiple?n:n[0]}}},e._l(e.categories,function(t){return n("option",{key:t.id,domProps:{value:t.id}},[e._v(e._s(t.name))])})):e._e(),e._v(" "),n("p",[e._v("You've chosen to answer "+e._s(e.numQuestions)+" "+e._s(e.difficulty)+" difficulty\n  questions from the: "),n("br"),e._v(" "+e._s(e.getCatNameFromId)+" category.")])],1)},staticRenderFns:[]};var f=n("VU/8")(d,p,!1,function(e){n("Oe2f")},"data-v-361cb6b3",null).exports;i.a.use(r.a);var m=new r.a({routes:[{path:"/",name:"Quiz",component:f}]}),_=n("yXtV"),g=n.n(_);i.a.use(g.a,{namespace:"trivia__"}),i.a.config.productionTip=!1,new i.a({el:"#app",router:m,components:{App:s},template:"<App/>"})},Oe2f:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.5c8139253dea102c0976.js.map