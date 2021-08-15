import {
    trigger,
    animate,
    transition,
    style,
    query,
    group,
    useAnimation
  } from '@angular/animations';
import { getFilterParsedObjectResult } from 'angular-slickgrid';
import { bounceInDown,
  bounceInUp,
  bounceInLeft,
  lightSpeedIn,
  fadeInDown,
  rotateInUpRight,
  flip,
  rubberBand,
  fadeIn,
bounceIn } from 'ng-animate';
const globalAnimation=fadeIn;
const globalTiming=0.5;
const globalDelay=0;
export const homeModule = trigger('routeAnimations', [
  // The '* => *' will trigger the animation to change between any two states
  transition('notFoundx => dash', [
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]),
  transition('* => notFoundx', 
   
  [
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]
  ),
  //Dash to -> chart
  transition('dash => chart', 
   
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
),
  //backward
  transition('chart => dash', 
   
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
  
),
//backward
transition('* => dash', 
useAnimation(globalAnimation,{
  // Set the duration to 5seconds and delay to 2seconds
  params: { timing: globalTiming, delay: globalDelay }
})
),
transition('* => chart', 
useAnimation(globalAnimation,{
  // Set the duration to 5seconds and delay to 2seconds
  params: { timing: globalTiming, delay: globalDelay }
}) 
),
]);

export const vmmModule = trigger('routeAnimations', [
  // The '* => *' will trigger the animation to change between any two states
  transition('notFoundx => dash',[
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]),
  transition('* => notFoundx', 
  [
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]
  ),
  //Child Module Entry
  transition('* => vmm', 
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })

),
  //Dash to -> chart
  transition('vmm => add', 
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  }) 
),
  //backward
  transition('add => dash', 
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
),

]);

export const UserModule = trigger('routeAnimations', [
  // The '* => *' will trigger the animation to change between any two states
  transition('notFoundx => dash',[
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]),
  transition('* => notFoundx', 
   
  [
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]
  ),
  //Child Module Entry
  transition('* => user', 
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })

),
  //Dash to -> chart
  transition('user => add', 
   
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
),
  //backward
  transition('add => dash', 
   
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
),

]);

export const ToolsModule = trigger('routeAnimations', [
  // The '* => *' will trigger the animation to change between any two states
  transition('notFoundx => dash',[
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]),
  transition('* => notFoundx', 
  [
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
  ]
  ),
  //Child Module Entry
  transition('* => tools', 
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })

),
  //Dash to -> chart
  transition('tools => dtb', 
   
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
),
  //backward
  transition('dtb => tools', 
   
  useAnimation(globalAnimation,{
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: globalTiming, delay: globalDelay }
  })
),

//Dash to -> chart
transition('tools => ltb', 
   
useAnimation(globalAnimation,{
  // Set the duration to 5seconds and delay to 2seconds
  params: { timing: globalTiming, delay: globalDelay }
})
),
//backward
transition('ltb => tools', 
 
useAnimation(globalAnimation,{
  // Set the duration to 5seconds and delay to 2seconds
  params: { timing: globalTiming, delay: globalDelay }
})
),

]);

/* export const homeModule = trigger('routeAnimations', [
    // The '* => *' will trigger the animation to change between any two states
    transition('notFoundx => dash', [
   
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.3 seconds
        [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
        { optional: true }
      )
    ]),
    transition('* => notFoundx', 
     
    fadeOut()
    ),
    //Dash to -> *
    transition('dash => add', 
     
      slideTo('right',0) 
    ),
    //Dash to -> *
    transition('* => vmm', 
     
      slideTo('bottom',0) 
    ),
    //Dash to -> *
    transition('* => user', 
     
      slideTo('right',0) 
    ),
    transition('dash => chart', 
     
      slideTo('right',0) 
    ),
    //Dash to -> *
    transition('vmm => user', 
     
      slideTo('right',0) 
    ),
    
    transition('user => vmm', 
     
      slideTo('left',0) 
    ),
    
    //Add to *
    //forward
    transition('add => chart', 
     
    slideTo('right',0) 

  ),
  //backward
  transition('add => dash', 
     
  slideTo('left',0) 
),
  //chart to *
  //backward
    transition('chart => add', 
     
      slideTo('left',0) 
    ),
    //backward
    transition('chart => dash', 
     
    slideTo('left',0) 
  )
  ]);
*/
  export const slider =
  trigger('routeAnimations', [
    transition('x => chxxart', slideTo('left',100) ),
    transition('groupx => dxash', slideTo('right',100) ),
    
  ]);

function slideTo(direction: string,top:number) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: top,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
function fadeOut(){
  return [
   
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(
      ':leave',
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
      { optional: true }
    )
  ];
}