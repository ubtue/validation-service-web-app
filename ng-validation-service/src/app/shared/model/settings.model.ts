import { Link } from './common-interfaces.model';

export interface ApplicationSettings {
	_links: Link[];
	id: number;
	parallelTasks: number;
	threadsPerTask: number;
  pageSize: number;
  messageTranslations: MessageTranslation;
}

export interface TrailerEncryptTranslation {
	de: string;
	en: string;
}

export interface EncryptTranslation {
	de: string;
	en: string;
}

export interface FontsTranslation {
	de: string;
	en: string;
}

export interface MultimediaTranslation {
	de: string;
	en: string;
}

export interface AttachmentsTranslation {
	de: string;
	en: string;
}

export interface FilesTranslation {
	de: string;
	en: string;
}

export interface PdfATranslation {
	de: string;
	en: string;
}

export interface PdfAEncryptedTranslation {
	de: string;
	en: string;
}

export interface MessageTranslation {
  pdfATranslations: PdfATranslation;
	pdfAEncryptedTranslations: PdfAEncryptedTranslation;
  encryptTranslations: EncryptTranslation;
	trailerEncryptTranslations: TrailerEncryptTranslation;
	fontsTranslations: FontsTranslation;
	multimediaTranslations: MultimediaTranslation;
	attachmentsTranslations: AttachmentsTranslation;
	filesTranslations: FilesTranslation;
}

