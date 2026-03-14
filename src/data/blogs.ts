import { FAQ } from '@/types/blog'

export const faqs: FAQ[] = [
  {
    id: 'born-too-soon',
    question: 'I was born too soon',
    answer: `I was born too soon as a Tech enthusiast.

    It's insane to me that guys like Taher Elgamal and Linus Torvalds are legit still alive and middle aged regular guys. 
    These are people who built the foundation of the internet and operating systems that make systems operate today, we're talking about.
    The internet itself is just 30 years old. I mean, the phone in my pocket right now would seem like something out of a sci-fi movie for guys just 20 years ago.
    I know the evolution of technology is not a linear process, but it's still very interesting to think about.
    Makes me sad a bit about all the tech I'll probably never get to experience.
    Imagine the tech scene in 2126. Will kids be still making B2B SaaS apps? Will the tools and frameworks be the same as we use today?
    How far can the abstraction layer go now that you can voice command an AI and it whips up a codebase for you?
   I was just explaining to my grandpa what google images is and what I do for work and he had no idea what I was talking about.It was all like actual magic to him.
   Makes me wonder, will I be the grandpa one day not understanding the tech that kids are using day to day?
   Probably not, but I will be gone one day. And there's so many video games, so many cool devices, so many ideas and innvovations I'll probably never get to experience.
   But maybe that's the point. I'm glad I'm here now. I'm glad I'm able to experience this stuff. I'm glad I'm able to build things that excite me.

`
  },
  {
    id: 'my-approach-to-design',
    question: 'My approach to design',
    answer: `Inspiration. Inspiration. Inspiration.
    I place immense trust on all the designers that came before me, faced the same challenges and solved them, lol
    My key strength is the confidence I have in my taste. Once handed the proper context and I decide on a creative direction, I take all the inspiration I can get from the best in the business, what sticks out to me, what I feel fits the use case and I combine all this to form a working, harmonious design.

    Very few ideas are so novel that they demand a design language or system of their own.
    Most of the time, a good design system can be applied to a new problem.

`
  },
  {
    id: 'confusion-to-clarity',
    question: 'How I Turn Confusion Into Clear, Working Systems',
    answer: `Most problems look complicated at first because they're poorly defined, not because they're hard.

When I feel stuck, I slow down and:
• Write the problem in plain English
• Break it into the smallest possible steps
• Solve one piece at a time

Clarity comes from structure.

Once the system makes sense in my head, the code usually follows naturally.

This mindset helps me debug faster, design better systems, and stay calm even when things get messy.`
  }
]

// Alias for blogs page compatibility
export const blogs = faqs

export const getFAQById = (id: string): FAQ | undefined => {
  return faqs.find(faq => faq.id === id)
}

// Alias for blog pages
export const getBlogById = getFAQById
