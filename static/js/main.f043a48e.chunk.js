(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(6),r=n.n(i),o=(n(12),n(4)),l=n(1);n(13);function u(e){var t=Object(a.useState)(""),n=Object(l.a)(t,2),i=n[0],r=n[1],o=Object(a.useState)(null),u=Object(l.a)(o,2),s=u[0],m=u[1],d=function(){i.trim()?(e.addTask(i.trim()),r(""),m(null)):(m("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f"),r(""))};return c.a.createElement("div",null,c.a.createElement("h3",null,e.title),c.a.createElement("div",null,c.a.createElement("input",{value:i,onChange:function(e){return r(e.currentTarget.value)},onKeyPress:function(e){m(null),"Enter"===e.key&&d()},className:s?"error":""}),c.a.createElement("button",{onClick:d},"+"),s&&c.a.createElement("div",{className:"error-message"},s)),c.a.createElement("ul",null,e.tasks.map((function(t){return c.a.createElement("li",{key:t.id},c.a.createElement("input",{type:"checkbox",checked:t.isDone,onChange:function(n){var a=n.currentTarget.checked;e.changeCheckbox(t.id,a)}}),c.a.createElement("span",null,t.title),c.a.createElement("button",{onClick:function(){return e.removeTask(t.id)}},"X"))}))),c.a.createElement("div",null,c.a.createElement("button",{className:"all"===e.filter?"button":"",onClick:function(){return e.changeFilter("all")}},"All"),c.a.createElement("button",{className:"active"===e.filter?"button":"",onClick:function(){return e.changeFilter("active")}},"Active"),c.a.createElement("button",{className:"completed"===e.filter?"button":"",onClick:function(){return e.changeFilter("completed")}},"Completed")))}var s=n(16);var m=function(){var e=Object(a.useState)([{id:Object(s.a)(),title:"HTML&CSS",isDone:!0},{id:Object(s.a)(),title:"JS",isDone:!0},{id:Object(s.a)(),title:"ReactJS",isDone:!1},{id:Object(s.a)(),title:"Sql",isDone:!0},{id:Object(s.a)(),title:"Mocha",isDone:!0},{id:Object(s.a)(),title:"Native",isDone:!1}]),t=Object(l.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)("all"),m=Object(l.a)(r,2),d=m[0],f=m[1],b=n;return"active"===d&&(b=n.filter((function(e){return e.isDone}))),"completed"===d&&(b=n.filter((function(e){return!e.isDone}))),c.a.createElement("div",{className:"App"},c.a.createElement(u,{title:"What to learn",tasks:b,removeTask:function(e){i(n.filter((function(t){return t.id!==e})))},changeFilter:function(e){f(e)},addTask:function(e){var t=[{id:Object(s.a)(),title:e,isDone:!1}].concat(Object(o.a)(n));i(t)},changeCheckbox:function(e,t){var a=n.find((function(t){return t.id===e}));a&&(a.isDone=t,i(Object(o.a)(n)))},filter:d}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.f043a48e.chunk.js.map