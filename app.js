const $=id=>document.getElementById(id);
const sel=new Set();
let deck=[],turn=0,names=['',''];
const wrap=$('cats');
for(const [k,c] of Object.entries(CATEGORIES)){
  const el=document.createElement('div');el.className='cat';
  el.innerHTML='<b>'+c.name+'</b><span>'+c.desc+' ('+c.questions.length+' คำถาม)</span>';
  el.onclick=()=>{
    if(sel.has(k)){sel.delete(k);el.classList.remove('on');}
    else if(sel.size>=3){$('err').textContent='เลือกได้สูงสุด 3 หมวด';return;}
    else{sel.add(k);el.classList.add('on');}
    $('count').textContent=sel.size+'/3';$('err').textContent='';
  };
  wrap.appendChild(el);
}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function show(id){for(const s of ['setup','game','end'])$(s).hidden=s!==id;}
function draw(){
  if(!deck.length){show('end');return;}
  const c=deck.pop();
  $('who').textContent=names[turn];
  $('tag').textContent=c.cat;
  $('q').textContent=c.q;
  $('left').textContent='เหลือการ์ด '+(deck.length+1)+' ใบ';
}
function advance(){turn=1-turn;draw();}
$('start').onclick=()=>{
  if(sel.size<1){$('err').textContent='เลือกอย่างน้อย 1 หมวด';return;}
  names=[$('p1').value.trim()||'ผู้เล่น 1',$('p2').value.trim()||'ผู้เล่น 2'];
  deck=[];
  for(const k of sel)for(const q of CATEGORIES[k].questions)deck.push({cat:CATEGORIES[k].name,q});
  shuffle(deck);turn=0;show('game');draw();
};
$('next').onclick=advance;
$('skip').onclick=advance;
$('quit').onclick=()=>show('setup');
$('again').onclick=()=>show('setup');
