import { NgModule } from '@angular/core';
import { DateFormatPipe } from './date-format/date-format';
import { SortPipe } from './sort/sort';
@NgModule({
	declarations: [DateFormatPipe,
    SortPipe],
	imports: [],
	exports: [DateFormatPipe,
    SortPipe]
})
export class PipesModule {}
