var grp=op('#grpSvg'),
rangeVal=op("#scaleVal"),
grpLine=op('.graphLines'),
origin=[grp.getBoundingClientRect().width/2,grp.getBoundingClientRect().height/2];
var scale=[rangeVal.value,rangeVal.value],idn=0;

function makeGraphLine() {
	var nx=Math.floor(grpLine.getBoundingClientRect().width/scale[0]),ny=Math.floor(grpLine.getBoundingClientRect().height/scale[1]),
	html="";

	for(let i=0; i<nx; i++){
		html+=`<div class="line vertical" style="--l: ${origin[0]+i*scale[0]};"><i>${i}</i></div>
		<div class="line vertical" style="--l: ${origin[0]-i*scale[0]};"><i>${-i}</i></div>`	
	}
	for(let i=0; i<ny; i++){
		html+=`<div class="line horizontal" style="--t: ${origin[1]+i*scale[1]};"><i>${-i}</i></div>
		<div class="line horizontal" style="--t: ${origin[1]-i*scale[1]};"><i>${i}</i></div>`		
	}
	grpLine.innerHTML=html;

}
makeGraphLine()

class graph{
	constructor(eq='#',extreme=origin[1]*2/scale[0],step=.5/scale[0]){
		var xPositive=[],xNegative=[];
		for(let x=0; x<extreme; x+=step){
			var yp=this.getY(eq,x);
			if(yp!=undefined){
				var posiPt=getPointFromOrigin([x*scale[0],yp*scale[1]]);
				xPositive.push( ` ${posiPt[0]},${posiPt[1]} ` );
			}

			var yn=this.getY(eq,-x);
			if(yn!=undefined){
				var negaPt=getPointFromOrigin([-x*scale[0],yn*scale[1]]);
				xNegative.push( ` ${negaPt[0]},${negaPt[1]} ` );
			}
		}

		this.drawLine(xPositive,xNegative);
	}

	getY(eq,x){
		var res=eval(eq.replaceAll("#",`1*${x}*1`));
		return !isNaN(res) && isFinite(res)? res : undefined;
	}

	drawLine(xPositive,xNegative){
		var html=`<polyline id="line${idn++}" points="" style="fill:none;stroke:#0f0;stroke-width:2; stroke-dasharray: 10 5; stroke-linecap: round;"></polyline>
		<polyline id="line${idn++}" points="" style="fill:none;stroke:#f00;stroke-width:2; stroke-dasharray: 10 5; stroke-linecap: round;"></polyline>`
		grp.insertAdjacentHTML('beforeend',html);

		var xpElem=op(`#line${idn-2}`),xnElem=op(`#line${idn-1}`);

		var xp=setInterval(()=>{
			var ar=xPositive.splice(0,10);
			if(ar.length!=0){
				xpElem.setAttribute("points",xpElem.getAttribute("points")+(ar));
			}else{
				clearInterval(xp);
			}
		},10)

		var xn=setInterval(()=>{
			var ar=xNegative.splice(0,10);
			if(ar.length!=0){
				xnElem.setAttribute("points",xnElem.getAttribute("points")+(ar));
			}else{
				clearInterval(xn);
			}
		},10)

	}
}

function getPointFromOrigin(pt) {
	return [(pt[0]+origin[0]),-pt[1]+origin[1]];
}