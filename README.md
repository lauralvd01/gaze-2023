## Gazification

Gazification is a web app designed to evaluate one's blood alcohol level in order to help our school associative bar to detect students that are too drunk and stop giving them alcoholic beverages. This app is part of a school project of four engineering students in computer science for their Advanved Software Engineering class.
It was developped using React Next framework, and using Supabase to handle the database, that is the accounst, beverages and "drink acts" management.

Students of our school can create an account, giving their username, gender, and weight. They can then add the drink they had on the app. All the beers available in our bar are already in the app, so we know exactly the alcohol content and the size of the bottles, and we can accurately calculate their alcohol level at each point in time. Everyone can see its own alcohol level. 

The app is designed for users that are not the bar, because we need them to be honest on what they drink, which would not be the case if they were not attracted to the site. Therefore, it is fully responsive and adapted for phones. users can also create "parties" where they can invite people to join, and see each other's blood alcohol level. All this data is then sent to the database and available to the bar.









This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
