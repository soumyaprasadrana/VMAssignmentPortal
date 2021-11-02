import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidator {  
    static restrictWhiteSpace(control: AbstractControl) : ValidationErrors | null {  
        if((control.value as string).indexOf(' ') >= 0){  
            return {restrictWhiteSpace: true}  
        }  
    
        return null;  
    }  
}  