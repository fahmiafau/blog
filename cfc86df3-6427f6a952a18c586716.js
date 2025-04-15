(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"6Ras":function(t,e,a){"use strict";var o=a("wTIg"),r=a("q1tI"),i=a("qKvR"),s=a("Wbzz"),l=a("gZs9"),p=a("joFz"),n=a("sjHn"),b=a("ZtNh");e.a=t=>{let{articles:e,alwaysShowAllDetails:a}=t;if(!e)return null;const o=1===e.length,{gridLayout:s="tiles",hasSetGridLayout:l,getGridLayout:p}=Object(r.useContext)(b.a),n=e.reduce((t,e,a,o)=>(a%2==0&&t.push(o.slice(a,a+2)),t),[]);return Object(r.useEffect)(()=>p(),[]),Object(i.jsx)(g,{style:{opacity:l?1:0},alwaysShowAllDetails:a},n.map((t,e)=>{const a=e%2!=0,r=e%2!=1;return Object(i.jsx)(f,{key:e,gridLayout:s,hasOnlyOneArticle:o,reverse:a},Object(i.jsx)(d,{article:t[0],narrow:a}),Object(i.jsx)(d,{article:t[1],narrow:r}))}))};const d=t=>{let{article:e,narrow:a}=t;if(!e)return null;const{gridLayout:o}=Object(r.useContext)(b.a),s=a&&e.title.length>35,l=a?e.hero.narrow:e.hero.regular,n=l&&0!==Object.keys(l).length&&l.constructor===Object;return Object(i.jsx)(L,{to:e.slug,"data-a11y":"false"},Object(i.jsx)(j,{gridLayout:o},Object(i.jsx)(v,{narrow:a,gridLayout:o},n?Object(i.jsx)(p.c,{src:l}):Object(i.jsx)(p.a,null)),Object(i.jsx)("div",null,Object(i.jsx)(y,{dark:!0,hasOverflow:s,gridLayout:o},e.title),Object(i.jsx)(O,{narrow:a,hasOverflow:s,gridLayout:o},e.excerpt),Object(i.jsx)(k,null,e.date," · ",e.timeToRead," min read"))))},c=Object(i.css)("text-overflow:ellipsis;overflow-wrap:normal;-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;white-space:normal;overflow:hidden;",n.a.phablet`
    -webkit-line-clamp: 3;
  `,""),x={name:"1fq9f5n",styles:"p{display:-webkit-box;}h2{margin-bottom:10px;}"},g=Object(o.a)("div",{target:"e14bbv6l0"})("transition:opacity 0.25s;",t=>t.alwaysShowAllDetails&&x,""),m=t=>Object(i.css)("position:relative;display:grid;grid-template-columns:",t.reverse?"457px 1fr":"1fr 457px",";grid-template-rows:2;column-gap:30px;&:not(:last-child){margin-bottom:75px;}",n.a.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `," ",n.a.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `,""),h=t=>Object(i.css)("display:grid;grid-template-rows:1fr;grid-template-columns:1fr 488px;grid-column-gap:96px;grid-template-rows:1;align-items:center;position:relative;margin-bottom:50px;",n.a.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `," ",n.a.tablet`
    grid-template-columns: 1fr;
  `," @media (max-width:540px){background:",t.theme.colors.card,";}",n.a.phablet`
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `,""),u=t=>Object(i.css)("position:relative;",n.a.tablet`
    margin-bottom: 60px;
  `," @media (max-width:540px){background:",t.theme.colors.card,";}",n.a.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `,""),w=t=>Object(i.css)("display:grid;grid-template-rows:",t.hasOnlyOneArticle?"1fr":"1fr 1fr",";"),f=Object(o.a)("div",{target:"e14bbv6l1"})(t=>"tiles"===t.gridLayout?m:w,""),j=Object(o.a)("div",{target:"e14bbv6l2"})(t=>"rows"===t.gridLayout?h:u,""),v=Object(o.a)("div",{target:"e14bbv6l3"})("position:relative;height:",t=>"tiles"===t.gridLayout?"280px":"220px",";box-shadow:0 30px 60px -10px rgba(0,0,0,",t=>t.narrow?.22:.3,"),0 18px 36px -18px rgba(0,0,0,",t=>t.narrow?.25:.33,");margin-bottom:",t=>"tiles"===t.gridLayout?"30px":0,";transition:transform 0.3s var(--ease-out-quad),box-shadow 0.3s var(--ease-out-quad);& > div{height:100%;}",n.a.tablet`
    height: 200px;
    margin-bottom: 35px;
  `," ",n.a.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `,""),y=Object(o.a)(l.a.h2,{target:"e14bbv6l4"})("font-size:21px;font-family:",t=>t.theme.fonts.serif,";margin-bottom:",t=>t.hasOverflow&&"tiles"===t.gridLayout?"35px":"10px",";transition:color 0.3s ease-in-out;",c,";",n.a.desktop`
    margin-bottom: 15px;
  `," ",n.a.tablet`
    font-size: 24px;  
  `," ",n.a.phablet`
    font-size: 22px;  
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `,""),O=Object(o.a)("p",{target:"e14bbv6l5"})(c,";font-size:16px;margin-bottom:10px;color:",t=>t.theme.colors.grey,";display:",t=>t.hasOverflow&&"tiles"===t.gridLayout?"none":"box",";max-width:",t=>t.narrow?"415px":"515px",";",n.a.desktop`
    display: -webkit-box;
  `," ",n.a.phablet`
    margin-bottom: 15px;
  `," ",n.a.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `,""),k=Object(o.a)("div",{target:"e14bbv6l6"})("font-weight:600;font-size:16px;color:",t=>t.theme.colors.grey,";opacity:0.33;",n.a.phablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `,""),L=Object(o.a)(s.Link,{target:"e14bbv6l7"})("position:relative;display:block;width:100%;height:100%;top:0;left:0;border-radius:5px;z-index:1;transition:transform 0.33s var(--ease-out-quart);-webkit-tap-highlight-color:rgba(255,255,255,0);&:hover ",v,",&:focus ",v,"{transform:translateY(-1px);box-shadow:0 50px 80px -20px rgba(0,0,0,0.27),0 30px 50px -30px rgba(0,0,0,0.3);}&:hover h2,&:focus h2{color:",t=>t.theme.colors.accent,";}&[data-a11y='true']:focus::after{content:'';position:absolute;left:-1.5%;top:-2%;width:103%;height:104%;border:3px solid ",t=>t.theme.colors.accent,";background:rgba(255,255,255,0.01);border-radius:5px;}",n.a.phablet`
    &:hover ${v} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `,"")}}]);
//# sourceMappingURL=cfc86df3-6427f6a952a18c586716.js.map