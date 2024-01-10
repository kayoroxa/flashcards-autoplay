function splitText(text) {
  const textSplitted = text
    .replace(/\n+/g, '')
    .replace(/([.,!])/g, '$1*')
    .split('*')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  const sentenceLimitSizeCaracters = 45

  //join sentence small then limit

  const j = textSplitted.reduce((prev, cur, i) => {
    if (prev.length === 0) {
      prev.push(cur)
      return prev
    }
    const last = prev[prev.length - 1]
    if (last.length + cur.length <= sentenceLimitSizeCaracters) {
      prev[prev.length - 1] += ' ' + cur
    } else {
      prev.push(cur)
    }
    return prev
  }, [])

  return j.join('\n')
}

const text = `Hi there! I want to share an experience I had recently. It was a beautiful sunny day, and I decided to spend some time at the park. I love being outdoors, so I was really excited about it.

I packed a small bag with some snacks and a book, and I headed to the park. When I arrived, I found a nice spot under a tree and spread out my blanket. The sun was shining brightly, and a gentle breeze was blowing. It was just perfect!

I started reading my book, but I couldn't help but notice all the activity around me. There were kids playing on the swings and laughing loudly. Some people were walking their dogs, and others were having picnics with their families. It was a real hub of activity.

After a while, I decided to take a stroll around the park. I walked along the path, enjoying the colorful flowers and the sound of birds chirping. I even saw a squirrel darting up a tree – it was so cute!

As I continued walking, I saw a group of people playing a friendly game of frisbee. They looked like they were having so much fun that I decided to join them. I introduced myself, and they were really friendly. They explained the rules of the game to me, and we started playing. I wasn't very good at it, but they were patient and cheered me on.

After playing for a while, I felt thirsty, so I took a break and enjoyed some snacks. I watched as the sun started to set, casting a warm orange glow across the park. It was such a peaceful moment.

As the day came to an end, I gathered my things and headed home. I felt so refreshed and happy after spending the day outdoors, surrounded by nature and friendly people. I realized how important it is to take breaks from our busy lives and enjoy the simple pleasures around us.

I'm already looking forward to my next visit to the park. It's amazing how a simple day outdoors can bring so much joy and relaxation.`

console.log(splitText(text))
