---
title: "CSS Flexbox: გზამკვლევი"
description: "ვისწავლოთ ერთ-ერთი ფუნდამენტური ხელსაწყო, რომელიც კონტენტის მოქნილად განლაგების საშუალებას გვაძლევს."
date: 2023-02-08
image: "/assets/images/flexbox.jpg"
imageAlt: "A layout of boxes in a flexbox fashoin"
---

[[toc]]

# რა არის ფლექსბოქსი?

ფლექსბოქსი არის ერთგანზომილებიანი განლაგების მოდელი, რომლის დანიშნულებაცაა მოქნილად
განალაგოს ნივთები კონკრეტულ სივრცეში. ერთგანზომილებიან მოდელში იგულისხმება ის, რომ
ფლექსბოქსი აკონტროლებს სიბრტყეზე ერთ კონკრეტულ განზომილებას - ან სტრიქონს, ან სვეტს.
მაგალითად, ამისგან განსხვავებით,
[გრიდი](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)
აკონტროლებს სვეტებსა და სტრიქონებს ერთდროულად.

# ორი ღერძი და მათი მიმართულება

ფლექსბოქსით მუშაობისას თვალთახედვაში უნდა გვქონდეს ორი ღერძი: **მთავარი ღერძი (main axis)** და **მართობული
ღერძი (cross axis)**. მთავარ ღერძს განსაზღვრავს ფროფერთი `flex-direction` (ფლექსის მიმართულება), ხოლო
მართობული ღერძი არის მისი პერპენდიკულარული.

მთავარი ღერძს განსაზღვრავს `flex-direction`, რომელსაც აქვს ოთხი შესაძლო მნიშვნელობა:

- `row`
- `row-reverse`
- `column`
- `column-reverse`

თუ მიმართულების მნიშვნელობად ავირჩევთ `row`-ს ან `row-reverse`-ს, ჩვენი მთავარი ღერძი
იქნება სტრიქონის გასწვრივ, ჰორიზონტალურად. ღერძის დასაწყისი `row`-ს შემთხვევაში
(რასაც ქვემოთ სურათში ხედავთ) არის მარცხენა მხარე და დასასრული - მარჯვენა, როგორც
ქართული დამწერლობის მიმართულება.

![flex-direction: row](https://i.imgur.com/OYE4MGB.png)

`row-reverse`-ის შემთხვევაში, დასაწყისი და დასასრული ადგილებს ცვლიან. ახლა მიმართულება
გვექნება მარჯვნიდან მარცხნივ, როგორც არაბულ დამწერლობაში.

![flex-direction: row-reverse](https://i.imgur.com/kYPeKOW.png)

`column`-ის შემთხვევაში მთავარი ღერძი ხდება სვეტი და შესაბამისად მიმართულება გვექნება ზემოდან ქვემოთ.
მისი მართობული ღერძი მაშინ იქნება სტრიქონი, ანუ ჰორიზონტალური ღერძი.

![flex-direction: column](https://i.imgur.com/MWqfYZN.png)

`row-reverse`-ის შემთხვევაში მთავარი ღერძი ისევ სვეტია, თუმცა იცვლება მისი დასაწყისი და დასასრული.
ახლა ნივთები განლაგდებიან ქვემოდან ზემოთ.

![flex-direction: column-reverse](https://i.imgur.com/SauQvc6.png)

მთავარი ღერძისა და დასაწყისი/დასასრულის ტერმინებით აზროვნება ფლექსბოქსთან მუშაობის დროს თუ
ჩვევად გაგვივითარდა, არა მხოლოდ ფლექსბოქსის, არამედ გრიდის გამოყენებაც გაგვიადვილდება.

# Flex Container

ფლექსბოქსის განლაგების მქონე დოკუმენტის მონაკვეთს ეწოდება **ფლექს კონტეინერი (flex container)**.
ფლექს კონტეინერის შესაქმნელად ჩვენ კონკრეტული მონაკვეთის კონტეინერის `display` ფროფერთიზე
ვაყენებთ `flex`-ს (ან [`inline-flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#precomposed)).

```css
.some-container {
  display: flex;
}
```

როგორც კი ჩვენ ამას ვიზამთ, ამ კონტეინერის უშუალო შვილები გადაიქცევიან **ფლექს აითემებად (flex items)**.
როგორც სხვა ფროფერთიების უმეტესობა, ფლექს კონტეინერისა და ფლექს აითემის ფროფერთიებიც წინასწარ გარკვეულ მნიშვნელობებს
იღებენ. ახლად შექმნილ ფლექსბოქსში, ფლექს აითემები შემდეგნაირად იქცევიან:

- აითემები განლაგებულები არიან სტრიქონში (`flex-direction`-ის საწყისი მნიშვნელობაა `row`).
- აითემები განლაგებას იწყებენ მთავარი ღერძის საწყისი წერტილიდან.
- აითემები მთავარ განზომილებაზე არ იწელებიან, მაგრამ შეუძლიათ შევიწროვება.
- აითემები გაიწელებიან რომ შეავსონ მართობულ ღერძზე დარჩენილი სივრცე.
- `flex-basis` ფროფერთი დაყენებულია `auto`-ზე.
- `flex-wrap` ფროფერთი დაყენებულია `no-wrap`-ზე.

შედეგად ფლექს აითემები ერთ სტრიქონში ჩამწკრივდებიან და გამოიყენებენ თავიანთი შიგთავსის ზომას
მთავარ ღერძზე სივრცის დასაკავებლად. თუ ღერძზე აითემების რაღაც რაოდენობა არ ეტევა,
ისინი არ ჩამოიშლებიან მეორე სტრიქონზე, არამედ გადაჭარბებენ კონტეინერის მოცულობას
მთავარ ღერძზე (იხილეთ [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)).
თუ ზოგიერთი აითემი სხვებზე მაღალია, დანარჩენი აითემებიც გაიწელებიან მართობული ღერძის მიმართულებით,
რომ ამ ღერძის ზომა მთლიანად დაიკავონ.

## ფლექსის მიმართულების შეცვლა

ფლექს კონტეინერზე `flex-direction` ფროფერთით შეგვიძლია იმის შეცვლა, თუ რა მიმართულებით განლაგდებიან
ფლექს აითემები. პირველ თავში ჩევნ უკვე განვიხილეთ რა მნიშვნელობა როგორ განალაგებს აითემებს.

```css
.some-container {
  display: flex;

  /* სტრიქონი */
  flex-direction: row;
  /* შებრუნებული სტრიქონი */
  flex-direction: row-reverse;
  /* სვეტი */
  flex-direction: column;
  /* შებრუნებული სვეტი */
  flex-direction: column-reverse;
}
```

## მრავალხაზიანი კონტეინერი flex-wrap-ით

მიუხედავად იმისა, რომ ფლექსბოქსი ერთგანზომილებიანი მოდელია, ჩვენ მაინც შეგვიძლია
ფლექს აითემების რამდენიმე ხაზზე ჩამოშლა. ამ შემთხვევაში უმჯობესია, თუ თითოეულ
ხაზს ახალ ფლექს კონტეინერად განვიხილავთ. ნებისმიერი სივრცის განაწილება მოხდება
ამ ცალკეული ხაზის გასწვრივ, სხვა ხაზებზე არსებულ სივრცესთან მიმართების გარეშე.

ჩამოშლის ქცევის მითითება შეგვიძლია `flex-wrap` ფროფერთის დაყენებით:

```css
.some-container {
  display: flex;
  flex-wrap: wrap;
}
```

ახლა, თუ ფლექს აითემები ზედმეტად დიდია, რომ ერთ ხაზზე დაეტიონ, ისინი ჩამოიშლებიან
დამატებით ხაზზე.

## შემოკლებული ვარიანტი: flex-flow

ჩვენ შეგვიძლია გავაერთიანოთ ორი ფროფერთი `flex-direction` და `flex-wrap` ერთში - `flex-flow`.
პირველი მნიშვნელობა განსაზღვრავს `flex-direction`, ხოლო მეორე - `flex-wrap`-ს.

```css
.some-container {
  display: flex;
  flex-flow: row wrap;
}
```

## ღერძებზე განლაგება

ფლექსბოქსის ერთ-ერთი უმთავრესი ფუნქცია არის აითემების განლაგება მთავარ და მართობულ ღერძზე
და სივრცის განაწილება ფლექს აითემებს შორის. ყურადღება მიაქციეთ, რომ აღნიშნული განლაგების
ფროფერთიები მიენიჭება ფლექს კონტეინერს და არა ფლექს აითემებს.

### align-items

`align-items` ფოფერთი განალაგებს აითემებს მართობულ ღერძზე.

ამ ფროფერთის საწყისი მნიშვნელობა არის `stretch` და სწორედ ამიტომ ფლექს აითემები
იწელებიან ფლექს კონტეინერის სიმაღლეზე. სიმაღლე შეიძლება განსაზღვროს კონტეინერში არსებულმა
ყველაზე მაღალმა აითემმა, ან იმ ზომამ, რომელიც თვითონ კონტეინერისთვისაა გაწერილი.

`align-items`-ს შემდეგი მნიშვნელობები შეგვიძლია მივანიჭოთ:

- `stretch`
- `flex-start`
- `flex-end`
- `center`

`flex-start` და `flex-end` შესაბამისად განათავსებენ აითემებს ან მართობული ღერძის თავში, ან ბოლოში.
`center` მოაქცევს ნივთებს მართობული ღერძის ცენტრში.

### justify-content

`justify-content` ფროფერთი განალაგებს აითემებს მთავარ ღერძზე, რომელსაც, თავის მხრივ, `flex-direction`
განსაზღვრავს. შესაძლო მნიშვნელობებია:

- `flex-start`
- `flex-end`
- `center`
- `space-around`
- `space-between`
- `space-evenly`

საწყისი მნიშვნელობა დაყენებულია `flex-start`-ზე, ანუ მთავარი ღერძის დასაწყისზე, თუმცა შეგვიძლია
მისი შეცვლა `flex-end`-ით, რათა აითემები მთავარი ღერძის ბოლოში განაწილდნენ, ან `center`-ზე, რათა აითემები
მთავარი ღერძის ცენტრში მოვაქციოთ.

`space`-ით დაწყებული მნიშვნელობები აღნიშნავენ როგორ უნდა განაწილდეს თავისუფალი სივრცე აითემებს შორის.
`space-around` გულისხმობს აითემების ორივე მხარეს ნახევარი ზომის სივრცის შექმნას.
`space-evenly` აითემებს შორის თანაბარ დაშორებას შექმნის, ისე, რომ აითემებს ორივე მხარეს ექნებათ მაქსიმალური
თავისუფალი სივრცე.
`space-between` უშუალოდ აითემებს შორის (და არა მათ ორივე მხარეს) ქმნის მაქსიმალურ და თანაბარ თავისუფალ სივრცეს.

### ვერტიკალურად და ჰორიზონტალურად ცენტრში მოქცევა

რათა მშობელ კონტეინერში არსებული ყველა მისი აითემი მოვაქციოთ ცენტრში, უნდა გამოვიყენოთ ზემოთ ხსენებული ორივე
ფროფერთის კომბინაცია:

```css
.some-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### მიმართულების პრობლემა

რატომ ღირს ფლექსბოქსის მთავარი და მართობული ღერძის ტერმინებით გააზრება? იმიტომ, რომ `flex-direction`-ის
შეცვლით, მთავარ ღერძთან ერთად `align-items`-ისა და `justify-content` ჰორიზონტალურობა თუ ვერტიკალურობა იცვლება!
თუ `row` მიმართულების შემთხვევაში `justify-content` აითემებს სტრიქონზე განალაგებს ჰორიზონტალურად,
`column`-ის შემთხვევაში ის აითემებს განალაგებს სვეტზე, ვერტიკალურად. იგივე ეხება `align-items`.

# Flex Item

ფლექს აითემების გასაკონტროლებლად შეგვიძლია უშუალოდ მათი შემდეგი ფროფერთიების შეცვლა:

- `flex-grow`
- `flex-shrink`
- `flex-basis`

ამ ფლექს ფოფერთიების შეცვლით ჩვენ განსხვავებულად ვანაწილებთ თავისუფალ სივრცეს
აითემებს შორის.

თუ ჩვენ გვაქვს სამი 100 პიქსელის სიგანის აითემები 500 პიქსელის სიგანის
კონტეინერში, მაშინ აითემების განლაგებისთვის საჭირო სივრცე იქნება 300 პიქსელი
და თავისუფალი სივრცე დაგვრჩება 200 პიქსელი. თუ ჩვენ პირვანდელ მნიშვნელობებს
არ შევცვლით, მაშინ ეს თავისუფალი სივრცე განთავსდება ბოლო აითემის შემდეგ.

![free space chart](https://i.imgur.com/sdangdL.png)

თუ ჩვენ გვინდა, რომ აითემები გაიწელონ და სივრცე შეავსონ, დაგვჭირდება
აითემებს შორის თავისუფალი სივრცის განაწილების მეთოდი. სწორედ ამისთვის
არსებობს ზემოთ ჩამოთვლილი `flex` ფროფერთიები, რომლებსაც უშუალოდ
ფლექს აითემებს ვანიჭებთ.

## flex-basis

`flex-basis` განსაზღვრავს აითემის ზომას იმის მიხედვით, თუ რამხელა თავისუფალ
სივრცეს ტოვებს. მისი თავდაპირველი მნიშვნელობა არის `auto`, რის გამოც ბრაუზერი
ამოწმებს, აქვთ თუ არა აითემებს ზომა. ზემოთ ნაჩვენებ მაგალითში ყველა აითემს
აქვს 100 პიქსელი სიგანე და სწორედ ეს ზომა გამოიყენება `flex-basis`-ად.

თუ აითემებს არ აქვთ ზომა, მაშინ მათი შიგთავსის ზომა გამოიყენება
`flex-basis`-ად. სწორედ ამის გამო ხდება, რომ როცა მშობელ კონტეინერს
ვანიჭებთ `display: flex`-ს, ყველა აითემი ერთ სტრიქონში მწკრივდება და მხოლოდ
იმხელა სივრცე მიაქვთ, რამხელაც მათ შიგთავსს სჭირდება.

## flex-grow

`flex-grow` ფროფერთის მნიშვნელობის დადებით რიცხვზე დაყენებისას, ფლექს აითემი
თავისი `flex-basis`-იდან გაიზრდება მთავარი ღერძის გასწვრივ. ამის საშუალებით
აითემი გაიწელება და ნებისმიერ თავისუფალ სივრცეს დაიკავებს, ან თავისუფალი
სივრცის რაღაც პროპორციას, თუ სხვა აითემებსაც ექნებათ გაწელვის უფლება
(ანუ თუ მათაც მიენიჭებათ `flex-grow`).

`flex-grow` ფროფერთით შეიძლება სივრცის პროპორციულად განაწილება.
თუ ჩვენ ყველა აითემს მივანიჭებთ `flex-grow: 1`-ს, მაშინ თავისუფალ სივრცეს
ისინი თანაბრად გაინაწილებენ და თანაბრად გაიზრდებიან. თუ ჩვენ პირველ აითემს
`flex-grow`-ზე მივანიჭებთ 2-ს, ხოლო დანარჩენ ორ აითემს მივანიჭებთ 1-ს,
მაშინ პირველი აითემი მიითვისებს თავისუფალი სივრცის 2/4-ს (100px 200px-დან),
ხოლო დანარჩენი ორი აითემი ცალ-ცალკე მიითვისებს 1/4-ს (შესაბამისად თითოს
ერგება 50px 200px-დან). როგორ ვხვდებით რა წილი ერგება თითოეულ აითემს?
თითოეული აითემის წილადის მრიცხველი მათი `flex-grow`-ს მნიშვნელობაა, ხოლო
მნიშვნელი - კონტეინერში ყველა ფლექს აითემის `flex-grow` მნიშვნელობის ჯამი.

## flex-shrink

`flex-shrink`-ის დანიშნულება (`flex-grow`-ს საპირისპიროდ) არის სივრცის
წართმევა. თუ კონტეინერში საკმარისი სივრცე არ გვაქვს, რომ ნივთები განვათავსოთ,
`flex-shrink`-ის მნიშვნელობის დადებითი რიცხვით შეცვლის საშუალებით, მას
მიეცემა უნარი, რომ თავის `flex-basis`-ზე უფრო პატარა გახდეს. ისევე,
როგორც `flex-grow`-ს შემთხვევაში, სხვადასხვა მნიშვნელობები შეგვიძლია
გამოვიყენოთ, რომ ზოგი აითემი სხვებზე უფრო მალე დაპატარავდეს.
აითემი, რომელსაც უფრო დიდი რიცხვი უწერია `flex-shrink`-ზე, უფრო
მალე დაპატარავდება.

გასათვალისწინებელია, რომ `flex-shrink` ყურადღებას აქცევს აითემის მინიმალურ
ზომას, ამიტომ რეალურად რამდენად დაპატარავდება აითემი შესაძლოა არაკონსისტენტური
იყოს.

## შემოკლებული ვარიანტი: flex

ზემოთ ხსენებული სამივე ფროფერთი შეგვიძლია გავაერთიანოთ ერთში - `flex`.
მნიშვნელობები შემდეგი თანმიმდევრობით ნაწილდება: `flex-grow`, `flex-shrink`,
`flex-basis`.

მაშასადამე ეს კოდი:

```css
.some-item {
  flex: 1 1 auto;
}
```

იგივეა რაც:

```css
.some-item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

არსებობს უფრო შემოკლებული ვარიანტებიც, რომლებიც ყველაზე გამოყენებად
შემთხვევებს მოიცავენ.

- `flex: initial` - იგივეა რაც `flex: 0 1 auto`.
- `flex: auto` - იგივეა რაც `flex: 1 1 auto`.
- `flex: none` - იგივეა რაც `flex: 0 0 auto`.
- `flex: <დადებითი_რიცხვი>` - იგივეა რაც `flex: <დადებითი_რიცხვი> 1 0`.

# შეჯამება

ამ სტატიაში განვიხილეთ ფლექსბოქსის საფუძვლები. ამ ცოდნის ასათვისებლად აუცილებლად სცადეთ ფლექსბოქსის პრაქტიკაში გამოყენება და ექსპერიმენტების ჩატარება. ამ სტატიით ფლექსბოქსი არ ამოიწურება, ამიტომ სიღრმისეული ცოდნის მისაღებად გირჩევთ გაეცნოთ დამატებით რესურსებს.

# დამატებითი რესურსები

რესურსები ორ კატეგორიად გავყავი: სახალისო (სუსტი მოთმინების მქონეებისთვის) და
სერიოზული (შედარებით მშრალი, მაგრამ უფრო ზუსტი და ამომწურავი).

### სახალისო

- [Flex Froggy (თამაში)](https://flexboxfroggy.com/)
- [Interactive Flexbox Guide](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)

### სერიოზული

- [Flexbox ქართულად](https://webschool.ge/html/1434)
- [Flexbox (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [Flexbox (web.dev)](https://web.dev/learn/css/flexbox/)
- [Learn flexbox the easy way (video)](https://youtu.be/u044iM9xsWU)
- [Flexbox design patterns you can use in your projects (video)](https://youtu.be/vQAvjof1oe4)