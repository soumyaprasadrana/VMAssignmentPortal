import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[runScripts]' })
export class RunScriptsDirective implements OnInit {
    constructor(private elementRef: ElementRef) { }
    ngOnInit(): void {
         console.log("[runScripts] [DEBUG] on init");
        
        setTimeout(() => { // wait for DOM rendering
            const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
            this.at=0;
            this.total = scripts.length;
            this.reinsertScripts(scripts);
            console.log("[runScripts] [DEBUG] scripts",scripts);
        });
    }
    at: number = 0;
    total!: number;
    reinsertScripts(items: HTMLScriptElement[]): void {
        const script = items[this.at];
        if (script) {
            const scriptCopy = <HTMLScriptElement>document.createElement('script');
            scriptCopy.type = script.type ? script.type : 'text/javascript';
            if (script.innerHTML) {
                scriptCopy.innerHTML = script.innerHTML;
            } else if (script.src) {
                scriptCopy.src = script.src;
            }
            scriptCopy.async = false;
            scriptCopy.onload = (e) => {
                this.at++;
                this.reinsertScripts(items);
            }
            if(script.parentNode)
                script.parentNode.replaceChild(scriptCopy, script);
        }
    }
}