interface scrollGodConfig {
    domList:HTMLDivElement[],
    index:number,
    animationTime:number,
    reversal?:boolean,
    rootSelect?:string,
    callBack:(a:boolean,b:number,c:HTMLDivElement|undefined)=>any|void
}
