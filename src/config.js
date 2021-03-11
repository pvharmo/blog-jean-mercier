export const siteName = 'The Movie Shrink'

export const tagline = 'Understanding significant films'
export const featureImage = '/header.png'

export const mainMenu = [
    {
        name: 'HOME',
        link: '/'
    },
    {
        name: 'ABOUT US',
        link: '/about'
    },
    {
        name: 'HERMENEUTICS',
        link: '/hermeneutics'
    },
    {
        name: 'FAQ',
        link: '/faq'
    },
    {
        name: 'CONTACT',
        link: '/contact'
    }
];

export const disqus = {
    on: true,
    loadingStrategy: 'button', // Options: onload, lazy, button
    // siteShortName: process.env.discusSite // 'blog-danielkelly-io'
}