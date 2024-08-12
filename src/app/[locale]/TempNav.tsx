import UiButton from '@/components/ui/UiButton';

function TempNav() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <UiButton href="about">about</UiButton>
            <UiButton href="activation-link-expired">
                activation link expired
            </UiButton>
            <UiButton href="auth">auth</UiButton>
            <UiButton href="change-forgotten-password/66070a443872b1f2acbda515">
                change-forgotten-password
            </UiButton>
            <UiButton href="privacy-policy">privacy-policy</UiButton>
            <UiButton href="profile/66070a443872b1f2acbda515">profile</UiButton>
            <UiButton href="main">main</UiButton>
            <UiButton href="wish/66070a443872b1f2acbda515">wish</UiButton>
            <UiButton href="wish-list/66070a443872b1f2acbda515">
                wish-list
            </UiButton>
            <UiButton href="/">welcome</UiButton>
        </div>
    );
}

export default TempNav;
