import { Subject } from 'rxjs';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';

export class ViewerStateService {

    selectedFileReport: Subject<FileReport> = new Subject<FileReport> ();

}