import { useTranslations } from 'next-intl';
import ClientForm from '@/app/[locale]/auth/ClientForm';
import UiThemeSwitcher from '@/components/ui/UiThemeSwitcher';
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from '@/helpers/utils/constants';
import WishHub from '@/components/ui/WishHub';
import UiLangSelect from '@/components/ui/UiLangSelect';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import TempNav from '@/app/[locale]/TempNav';
import Refresh from '@/helpers/hocs/Refresh';

export default function Auth() {
    const t = useTranslations();

    return (
        <main className="flex min-h-screen flex-col items-center gap-2 p-4 tablet-md:gap-8">
            <header className="flex w-full max-w-lg flex-col items-center gap-2 tablet-md:gap-8">
                <div className="flex w-full items-center justify-between gap-4">
                    <UiThemeSwitcher />
                    <UiLangSelect />
                </div>

                <WishHub withLogo isBig />

                <TempNav />
            </header>

            <Refresh>
                <RoutesGuard isUnauthenticated>
                    <ClientForm
                        titleT={t('auth-page.title.sing_in')}
                        singUpTitleT={t('auth-page.title.sing_up')}
                        forgotPasswordTitleT={t(
                            'auth-page.title.forgot_password'
                        )}
                        singInT={t('sing-in')}
                        singUpT={t('sing-up')}
                        forgotPasswordSubmitT={t('auth-page.recovery')}
                        privacyPolicyErrorT={t(
                            'auth-page.privacy_policy_error'
                        )}
                        passwordsErrorT={t('auth-page.passwords_error')}
                        googleErrorT={t('alerts.auth-page.google-login.error')}
                        orT={t('auth-page.or')}
                        validationFirstNameRequiredT={t(
                            'validations.first-name.required'
                        )}
                        validationFirstNameMinT={t(
                            'validations.first-name.min',
                            {
                                min: NAME_MIN_LENGTH,
                            }
                        )}
                        validationFirstNameMaxT={t(
                            'validations.first-name.max',
                            {
                                max: NAME_MAX_LENGTH,
                            }
                        )}
                        firstNameT={t('first-name')}
                        validationEmailRequiredT={t(
                            'validations.email.required'
                        )}
                        validationOnlyWhitespacesT={t(
                            'validations.only-whitespace'
                        )}
                        validationEmailPatternT={t('validations.email.pattern')}
                        validationPasswordRequiredT={t(
                            'validations.password.required'
                        )}
                        validationPasswordWhitespacesT={t(
                            'validations.password.whitespaces'
                        )}
                        validationPasswordMinT={t('validations.password.min', {
                            min: PASSWORD_MIN_LENGTH - 1,
                        })}
                        validationPasswordMaxT={t('validations.password.max', {
                            max: PASSWORD_MAX_LENGTH,
                        })}
                        passwordT={t('auth-page.password')}
                        repeatPasswordT={t('auth-page.repeat_password')}
                        passwordRememberedT={t('auth-page.password_remembered')}
                        forgotPasswordT={t('auth-page.forgot_password')}
                        agreeT={t('auth-page.i_agree_to')}
                        privacyPolicyT={t('auth-page.privacy_policy')}
                        wishHubT={t('auth-page.wish_hub')}
                    />
                </RoutesGuard>
            </Refresh>
        </main>
    );
}
