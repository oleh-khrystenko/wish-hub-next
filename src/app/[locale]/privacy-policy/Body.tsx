import { FC } from 'react';
import { useTranslations } from 'next-intl';
import AgreeAction from '@/app/[locale]/privacy-policy/AgreeAction';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiButton from '@/components/ui/UiButton';
import PrivacyPolicyIcon from '@/components/icons/PrivacyPolicyIcon';

const Body: FC = () => {
    const privacyPolicyPageT = useTranslations('privacy-policy-page');

    const breadcrumbsPages = [
        {
            href: 'privacy-policy',
            icon: (
                <PrivacyPolicyIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: privacyPolicyPageT('title'),
        },
    ];

    return (
        <main className="mx-auto mt-3 max-w-7xl">
            <Breadcrumbs pages={breadcrumbsPages} />

            <div className="mt-6 flex flex-col gap-6 px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <section className="flex flex-col gap-2.5">
                    <h1 className="text-center text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('title')}
                    </h1>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('updated')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('intro')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we-use')}{' '}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.privacypolicies.com/privacy-policy-generator/"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            {privacyPolicyPageT('generator')}
                        </a>
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('interpretation-definitions')}
                    </h2>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('interpretation')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('interpretation-text')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('definitions')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('definitions-intro')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('account-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('account')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('affiliate-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('affiliate')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('company-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('company')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('cookies-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('cookies')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('country-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('country')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('device-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('device')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('personal-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('personal')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('service-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('service')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('provider-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('provider')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('third-party-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('third-party')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('usage-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('usage')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('website-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('website')}{' '}
                                <UiButton href="/" variant="text-only">
                                    https://wish-hub.net/
                                </UiButton>
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('you-strong')}
                                </strong>{' '}
                                {privacyPolicyPageT('you')}
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('collecting')}
                    </h2>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('types')}
                    </h3>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('personal-data')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('personal-info')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('email')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('full-name')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('phone')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('address')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('usage_data')}
                            </p>
                        </li>
                    </ul>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('usage_data')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('usage_data_is')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('usage_data_may')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('when_you_access')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_may_also')}
                    </p>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('information_from_third-party')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('the_company_allows')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <span className="text-justify text-zinc-700 dark:text-zinc-300">
                                Google
                            </span>
                        </li>
                        <li>
                            <span className="text-justify text-zinc-700 dark:text-zinc-300">
                                Facebook
                            </span>
                        </li>
                        <li>
                            <span className="text-justify text-zinc-700 dark:text-zinc-300">
                                Instagram
                            </span>
                        </li>
                        <li>
                            <span className="text-justify text-zinc-700 dark:text-zinc-300">
                                Twitter
                            </span>
                        </li>
                        <li>
                            <span className="text-justify text-zinc-700 dark:text-zinc-300">
                                LinkedIn
                            </span>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('if_you_decide')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('you_may_also')}
                    </p>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('tracking_technologies')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_use_cookies')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'cookies_or_browser_cookies'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT('a_cookie_is')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('web_beacons')}
                                </strong>{' '}
                                {privacyPolicyPageT('certain_sections_of')}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('cookies_can_be')}{' '}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            {privacyPolicyPageT('privacy_policies_website')}
                        </a>{' '}
                        {privacyPolicyPageT('article')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_use_both')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('necessary')}
                                </strong>
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('session_cookies')}
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('administered_1')}
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('these_cookies_are')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('cookies_policy')}
                                </strong>
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('persistent_cookies_1')}
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('administered_2')}
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('these_cookies_identify')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'functionality_cookies'
                                    )}
                                </strong>
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('persistent_cookies_2')}
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('administered_3')}
                            </p>

                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('these_cookies_allow')}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('for_more_information')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('use_of_your')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('the_company_may')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('to_provide_and')}
                                </strong>{' '}
                                {privacyPolicyPageT('including_to_monitor')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'to_manage_your_account'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT(
                                    'to_manage_your_registration'
                                )}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('for_the_performance')}
                                </strong>{' '}
                                {privacyPolicyPageT('the_development')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('to_contact_you')}
                                </strong>{' '}
                                {privacyPolicyPageT('by_email')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('to_provide_you')}
                                </strong>{' '}
                                {privacyPolicyPageT('with_news')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'to_manage_your_requests'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT('to_attend')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'for_business_transfers'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_use_1')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('for_other_purposes')}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_use_2')}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_may_share_1')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'with_service_providers'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_share_2')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'for_business_transfers_2'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_share_3')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('with_affiliates')}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_share_4')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT(
                                        'with_business_partners'
                                    )}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_share_5')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('with_other_users')}
                                </strong>{' '}
                                {privacyPolicyPageT('when_you_share')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    {privacyPolicyPageT('with_your_consent')}
                                </strong>{' '}
                                {privacyPolicyPageT('we_may_disclose')}
                            </p>
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('retention')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('company_will_retain')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('company_will_also')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('transfer')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('your_information')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('your_consent')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('company_will_take')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('delete')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('you_have_the')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('our_service_may')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('you_may_update')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('please_note')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('disclosure')}
                    </h3>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('business_transactions')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('if_the_company')}
                    </p>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('law_enforcement')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('under_certain')}
                    </p>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('other_legal')}
                    </h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('company_may_disclose')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('comply_with')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('protect_defend')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('prevent_investigate')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('protect_personal')}
                            </p>
                        </li>

                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('protect_against')}
                            </p>
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('security')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('the_security_of')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('children_privacy')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('our_service_does')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('if_we_need')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('other_websites')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('our_service_may_contain')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_have_no')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('changes')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_may_update')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('we_will_let')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('you_are_advised')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('contact_us')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('if_you_have')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {privacyPolicyPageT('contact_email')}
                            </p>
                        </li>
                    </ul>
                </section>

                <AgreeAction text={privacyPolicyPageT('agree')} />
            </div>
        </main>
    );
};

export default Body;
