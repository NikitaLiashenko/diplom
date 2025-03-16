import { AbstractIntlMessages, createTranslator } from "next-intl";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(locale: string, messages: AbstractIntlMessages, errorMessage?: string) {
        const t = createTranslator({ locale, messages });
        super(t(errorMessage ? `Error.${errorMessage}` : "Error.notFound"), 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(locale: string, messages: AbstractIntlMessages) {
        const t = createTranslator({ locale, messages });
        super(t("Error.userNotAuthorized"), 401);
    }
}

export class ValidationError extends AppError {
    constructor(locale: string, messages: AbstractIntlMessages, errorMessage?: string) {
        const t = createTranslator({ locale, messages });
        super(t(errorMessage ? `Error.${errorMessage}` : "Error.validation"), 400);
    }
}

export class ForbiddenError extends AppError {
    constructor(locale: string, messages: AbstractIntlMessages, errorMessage?: string) {
        const t = createTranslator({ locale, messages });
        super(t(errorMessage ? `Error.${errorMessage}` : "Error.forbidden"), 403);
    }
}
