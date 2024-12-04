import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { GIFT_PRICE } from '@/helpers/utils/constants';
import Duration from '@/app/[locale]/rozigrash-bazhan/terms/Duration';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import Inactivated from '@/components/layouts/Inactivated';
import UiButton from '@/components/ui/UiButton';
import UiImage from '@/components/ui/UiImage';
import MainIcon from '@/components/icons/MainIcon';
import PrivacyPolicyIcon from '@/components/icons/PrivacyPolicyIcon';
import ShareIcon from '@/components/icons/ShareIcon';

const Body: FC = () => {
    const rozigrashBazhanTermsPageT = useTranslations(
        'rozigrash-bazhan-terms-page'
    );
    const allPagesT = useTranslations('all-pages');

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: 'rozigrash-bazhan',
            icon: (
                <div className="relative h-4 w-4">
                    <UiImage
                        src="/icons/gift-box-3D.webp"
                        alt={allPagesT('rozigrash-bazhan')}
                    />
                </div>
            ),
            name: allPagesT('rozigrash-bazhan'),
        },
        {
            href: 'rozigrash-bazhan/terms',
            icon: (
                <PrivacyPolicyIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('rozigrash-bazhan-terms'),
        },
    ];

    return (
        <main className="mx-auto mt-3 max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-6 flex flex-col gap-8 px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <section className="flex flex-col gap-2.5">
                    <h1 className="text-center text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('title')}
                    </h1>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('updated')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('ukrainian_18')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('general_provisions')}
                    </h2>

                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('purpose_giveaway')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('provide_users_with', {
                            price: GIFT_PRICE,
                        })}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('organizer')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        Wish Hub ({rozigrashBazhanTermsPageT('contact_details')}
                        :{' '}
                        <a
                            href="mailto:wish.hub.net@gmail.com"
                            className="font-bold"
                        >
                            wish.hub.net@gmail.com
                        </a>
                        )
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('duration')}
                    </h3>

                    <Duration />
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('who_can_participate')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('ukrainian_18')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('activated_profile')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('employees_relatives')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('how_to_participate')}
                    </h2>

                    {/* 1 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        1. {rozigrashBazhanTermsPageT('register_or_login')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('create_wish_hub')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('your_account_must')}
                    </p>

                    {/* 2 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        2. {rozigrashBazhanTermsPageT('share_your_referral')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('you_can_find')}:
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('on_personal')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT(
                                    'on_your_collection'
                                )}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('in_navigation')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('on_the')}{' '}
                                <UiButton
                                    href="rozigrash-bazhan"
                                    variant="text"
                                >
                                    {rozigrashBazhanTermsPageT('wish_giveaway')}
                                </UiButton>
                                {rozigrashBazhanTermsPageT('page')}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('link_contains')}
                        <ShareIcon iconClasses="inline mx-0.5 w-4 h-4 fill-cyan-500 dark:fill-cyan-300" />
                        .
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('share_this_link')}
                    </p>

                    {/* 3 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        3. {rozigrashBazhanTermsPageT('via_link')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('each_time')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('your_profile_with')}{' '}
                        <UiButton href="rozigrash-bazhan" variant="text">
                            {rozigrashBazhanTermsPageT('wish_giveaway')}
                        </UiButton>
                        {rozigrashBazhanTermsPageT('page')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('more_friends')}
                    </p>

                    {/* 4 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        4.{' '}
                        {rozigrashBazhanTermsPageT('create_at_least', {
                            price: GIFT_PRICE,
                        })}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('we_only_fulfill')}:
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('wish_must_have')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('it_must_include')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('must_not_exceed', {
                                    price: GIFT_PRICE,
                                })}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        <span className="font-bold text-rose-500">
                            {rozigrashBazhanTermsPageT('attention')}
                        </span>{' '}
                        {rozigrashBazhanTermsPageT('held_again_wish')}
                    </p>

                    {/* 5 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        5. {rozigrashBazhanTermsPageT('delivery_address')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('delivery_address_must')}:
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('set_with')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('include_city')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('work_exclusively')}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        <span className="font-bold text-rose-500">
                            {rozigrashBazhanTermsPageT('attention')}
                        </span>{' '}
                        {rozigrashBazhanTermsPageT('held_again_delivery')}
                    </p>

                    {/* 6 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        6. {rozigrashBazhanTermsPageT('follow_wish_hub')}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.instagram.com/wish_hub_net"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            Instagram
                        </a>
                        {rozigrashBazhanTermsPageT('optional')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('condition_not_mandatory')}{' '}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.instagram.com/wish_hub_net"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            Instagram
                        </a>
                        {rozigrashBazhanTermsPageT('page')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT(
                            'winner_selection_mechanics'
                        )}
                    </h2>

                    {/* 1 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        1. {rozigrashBazhanTermsPageT('determining_winner')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('winner_is_chosen')}
                    </p>

                    {/* 2 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        2. {rozigrashBazhanTermsPageT('how_winner')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('winner_is_determined')}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.random.org/"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            Random.org
                        </a>
                        {rozigrashBazhanTermsPageT('transparent_selection')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('at_the_time')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('system_generates')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT(
                                    'winner_is_announced'
                                )}
                                <a
                                    className="text-cyan-400 dark:text-cyan-300"
                                    href="https://www.instagram.com/wish_hub_net"
                                    target="_blank"
                                    rel="noopener noreferrer external nofollow"
                                >
                                    Instagram
                                </a>
                                {rozigrashBazhanTermsPageT('page')}
                            </p>
                        </li>
                    </ul>

                    {/* 3 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        3. {rozigrashBazhanTermsPageT('what_happens')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('if_selected')}
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('draw_is_held')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('same_way')}
                            </p>
                        </li>
                    </ul>

                    {/* 4 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        4. {rozigrashBazhanTermsPageT('how_to_increase')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('each_friend_who')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('more_friends_register')}
                    </p>

                    {/* 5 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        5.{' '}
                        {rozigrashBazhanTermsPageT('if_you_have', {
                            price: GIFT_PRICE,
                        })}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('if_your_profile', {
                            price: GIFT_PRICE,
                        })}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('if_cost')}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.random.org/"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            Random.org
                        </a>
                        {rozigrashBazhanTermsPageT('service')}
                    </p>

                    {/* 6 */}
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        6. {rozigrashBazhanTermsPageT('live_stream')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('entire_draw')}
                        <a
                            className="text-cyan-400 dark:text-cyan-300"
                            href="https://www.instagram.com/wish_hub_net"
                            target="_blank"
                            rel="noopener noreferrer external nofollow"
                        >
                            Instagram
                        </a>
                        .
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('can_watch')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('prize')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('prize_is')}:
                    </p>

                    <ul className="list-outside list-disc pl-6 marker:text-zinc-700 marker:dark:text-zinc-300">
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('wish_has')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('it_includes')}
                            </p>
                        </li>
                        <li>
                            <p className="text-justify text-zinc-700 dark:text-zinc-300">
                                {rozigrashBazhanTermsPageT('item_price', {
                                    price: GIFT_PRICE,
                                })}
                            </p>
                        </li>
                    </ul>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('we_fulfill_wishes')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('costs_more', {
                            price: GIFT_PRICE,
                        })}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('prize_cannot')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('wish_does_not')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('participant_requirements')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('only_one')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('fake_accounts')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('disqualification_rules')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('dishonest_methods')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('false_information')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('violating')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('publicity')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('event_winning')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('disclaimer')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('organizer_not_responsible')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('organizer_reserves')}
                    </p>
                </section>

                <section className="flex flex-col gap-2.5">
                    <h3 className="mt-2 text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {rozigrashBazhanTermsPageT('contacts')}
                    </h3>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {allPagesT('email')}{' '}
                        <a
                            href="mailto:wish.hub.net@gmail.com"
                            className="font-bold"
                        >
                            wish.hub.net@gmail.com
                        </a>
                    </p>
                </section>
            </div>

            <Inactivated />
        </main>
    );
};

export default Body;
