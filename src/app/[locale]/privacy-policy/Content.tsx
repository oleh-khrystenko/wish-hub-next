import {FC} from "react";
import {useTranslations} from "next-intl";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import UiButton from "@/components/ui/UiButton";
import PrivacyPolicyIcon from "@/components/icons/PrivacyPolicyIcon";


const Content: FC = () => {
    const privacyPolicyPageT = useTranslations('privacy-policy-page');

    const pages = [
        {
            href: 'privacy-policy',
            icon: (
                <PrivacyPolicyIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: privacyPolicyPageT('title'),
        },
    ];

    return (
        <div className="mt-3">
            <Breadcrumbs pages={pages} />

            <div className="mt-6 flex flex-col gap-6 px-4 pb-6 tablet-md:px-0 tablet-md:pb-10">
                <section className="flex flex-col gap-2.5">
                    <h1 className="text-center text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('title')}
                    </h1>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        { privacyPolicyPageT('updated') }
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        { privacyPolicyPageT('intro') }
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        { privacyPolicyPageT('we-use') }{' '}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.privacypolicies.com/privacy-policy-generator/"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            { privacyPolicyPageT('generator') }
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
                        { privacyPolicyPageT('interpretation-text') }
                    </p>

                    <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {privacyPolicyPageT('definitions')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        { privacyPolicyPageT('definitions-intro') }
                    </p>

                    <ul className="pl-6 list-disc list-outside marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('account-strong') }
                                </strong> { privacyPolicyPageT('account') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('affiliate-strong') }
                                </strong> { privacyPolicyPageT('affiliate') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('company-strong') }
                                </strong> { privacyPolicyPageT('company') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('cookies-strong') }
                                </strong> { privacyPolicyPageT('cookies') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('country-strong') }
                                </strong> { privacyPolicyPageT('country') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('device-strong') }
                                </strong> { privacyPolicyPageT('device') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('personal-strong') }
                                </strong> { privacyPolicyPageT('personal') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('service-strong') }
                                </strong> { privacyPolicyPageT('service') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('provider-strong') }
                                </strong> { privacyPolicyPageT('provider') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('third-party-strong') }
                                </strong> { privacyPolicyPageT('third-party') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('usage-strong') }
                                </strong> { privacyPolicyPageT('usage') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('website-strong') }
                                </strong> { privacyPolicyPageT('website') }{' '}
                                <UiButton
                                    href="/"
                                    variant="text-only"
                                    sizeLoading="h-5 min-h-5 w-5 min-w-5"
                                    bgLoading="bg-zinc-200 dark:bg-zinc-900"
                                >
                                    https://wish-hub.net/
                                </UiButton>
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('you-strong') }
                                </strong> { privacyPolicyPageT('you') }
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
                        { privacyPolicyPageT('personal-info') }
                    </p>

                    <ul className="pl-6 list-disc list-outside marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                { privacyPolicyPageT('email') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                { privacyPolicyPageT('full-name') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                { privacyPolicyPageT('phone') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                { privacyPolicyPageT('address') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                { privacyPolicyPageT('usage_data') }
                            </p>
                        </li>
                    </ul>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('usage_data_title') }</h4>
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('usage_data_is') }</p>
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('usage_data_may') }</p>
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('when_you_access') }</p>
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('we_may_also') }</p>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('information_from_third-party') }</h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('the_company_allows') }</p>

                    <ul className="pl-6 list-disc list-outside marker:text-zinc-700 marker:dark:text-zinc-300">
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

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('if_you_decide') }</p>
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('you_may_also') }</p>

                    <h4 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('tracking_technologies') }</h4>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('we_use_cookies') }</p>

                    <ul className="pl-6 list-disc list-outside marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('cookies_or_browser_cookies') }
                                </strong> { privacyPolicyPageT('a_cookie_is') }
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                <strong>
                                    { privacyPolicyPageT('web_beacons') }
                                </strong> { privacyPolicyPageT('certain_sections_of') }
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        { privacyPolicyPageT('cookies_can_be') }{' '}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            { privacyPolicyPageT('privacy_policies_website') }
                        </a>
                        { privacyPolicyPageT('article') }
                    </p>
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('we_use_both') }</p>

                    <ul className="pl-6 list-disc list-outside marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300"><strong>{ privacyPolicyPageT('necessary') }</strong></p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('session_cookies') }</p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('administered_1') }</p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('these_cookies_are') }</p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300"><strong>{ privacyPolicyPageT('cookies_policy') }</strong></p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('persistent_cookies_1') }</p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('administered_2') }</p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('these_cookies_identify') }</p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300"><strong>{ privacyPolicyPageT('functionality_cookies') }</strong></p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('persistent_cookies_2') }</p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('administered_3') }</p>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('these_cookies_allow') }</p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">{ privacyPolicyPageT('for_more_information') }</p>
                </section>
            </div>
        </div>
    );
};

export default Content;
