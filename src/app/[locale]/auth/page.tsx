import { useTranslations } from 'next-intl';
import ClientForm from '@/app/[locale]/auth/ClientForm';
import UiThemeSwitcher from '@/components/ui/UiThemeSwitcher';
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from '@/helpers/utils/constants';
import Header from '@/components/layouts/Header';
import UiLogo from '@/components/ui/UiLogo';

export default function Auth() {
    const t = useTranslations();

    // Title
    const titleT = t('auth-page.title.sing_in');
    const singUpTitleT = t('auth-page.title.sing_up');
    const forgotPasswordTitleT = t('auth-page.title.forgot_password');

    // Submit
    const singInT = t('sing-in');
    const singUpT = t('sing-up');
    const forgotPasswordSubmitT = t('auth-page.recovery');

    // Privacy Policy and Password Errors
    const privacyPolicyErrorT = t('auth-page.privacy_policy_error');
    const passwordsErrorT = t('auth-page.passwords_error');

    // Or
    const orT = t('auth-page.or');

    // First Name
    const validationFirstNameRequiredT = t('validations.first-name.required');
    const validationFirstNameMinT = t('validations.first-name.min', {
        min: NAME_MIN_LENGTH,
    });
    const validationFirstNameMaxT = t('validations.first-name.max', {
        max: NAME_MAX_LENGTH,
    });
    const firstNameT = t('first-name');

    // Email
    const validationEmailRequiredT = t('validations.email.required');
    const validationOnlyWhitespacesT = t('validations.only-whitespace');
    const validationEmailPatternT = t('validations.email.pattern');

    // Password
    const validationPasswordRequiredT = t('validations.password.required');
    const validationPasswordWhitespacesT = t(
        'validations.password.whitespaces'
    );
    const validationPasswordMinT = t('validations.password.min', {
        min: PASSWORD_MIN_LENGTH - 1,
    });
    const validationPasswordMaxT = t('validations.password.max', {
        max: PASSWORD_MAX_LENGTH,
    });
    const passwordT = t('auth-page.password');
    const repeatPasswordT = t('auth-page.repeat_password');

    // Password Actions
    const passwordRememberedT = t('auth-page.password_remembered');
    const forgotPasswordT = t('auth-page.forgot_password');

    // Privacy Policy
    const agreeT = t('auth-page.i_agree_to');
    const privacyPolicyT = t('auth-page.privacy_policy');
    const wishHubT = t('auth-page.wish_hub');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UiLogo />
            <UiThemeSwitcher />
            <br />
            <br />
            <ClientForm
                titleT={titleT}
                singUpTitleT={singUpTitleT}
                forgotPasswordTitleT={forgotPasswordTitleT}
                singInT={singInT}
                singUpT={singUpT}
                forgotPasswordSubmitT={forgotPasswordSubmitT}
                privacyPolicyErrorT={privacyPolicyErrorT}
                passwordsErrorT={passwordsErrorT}
                orT={orT}
                validationFirstNameRequiredT={validationFirstNameRequiredT}
                validationFirstNameMinT={validationFirstNameMinT}
                validationFirstNameMaxT={validationFirstNameMaxT}
                firstNameT={firstNameT}
                validationEmailRequiredT={validationEmailRequiredT}
                validationOnlyWhitespacesT={validationOnlyWhitespacesT}
                validationEmailPatternT={validationEmailPatternT}
                validationPasswordRequiredT={validationPasswordRequiredT}
                validationPasswordWhitespacesT={validationPasswordWhitespacesT}
                validationPasswordMinT={validationPasswordMinT}
                validationPasswordMaxT={validationPasswordMaxT}
                passwordT={passwordT}
                repeatPasswordT={repeatPasswordT}
                passwordRememberedT={passwordRememberedT}
                forgotPasswordT={forgotPasswordT}
                agreeT={agreeT}
                privacyPolicyT={privacyPolicyT}
                wishHubT={wishHubT}
            />
        </main>
    );
}
