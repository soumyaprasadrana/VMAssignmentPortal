// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal No Whitespace Validator
 */
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static restrictWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { restrictWhiteSpace: true };
    }

    return null;
  }
}
