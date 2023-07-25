inPan=op(".graphIn");
opp('.btnPan button').forEach(val=>{
	val.addEventListener("click",(e)=>{
		inPan.value = inPan.value.substring(0,inPan.selectionStart)+e.target.innerText+inPan.value.substring(inPan.selectionStart);
	})
})

function startMake() {
	var eq=inPan.value;
	var shortCut={
		"sin":"Math.sin",
		"cos":"Math.cos",
		"tan":"Math.tan",
		"logx":"Math.logx",
		"exp":"Math.pow",
		"mod":"Math.abs",
		"sqrt":"Math.sqrt",
		"cbrt":"Math.cbrt",
		"floor":"Math.floor",
		"floor":"Math.floor",
	}
	for(let val in shortCut){
		eq=eq.replaceAll(val,shortCut[val]);
	}
	try{
		new graph(eq);
	}catch(e){
		alert(e)
	}
}