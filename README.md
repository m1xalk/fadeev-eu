# fadeev.eu — техническая версия на Astro

Это готовый технический проект выбранного широкого дизайна. Он собирает три обычные статические HTML-страницы:

- английский: `/`
- испанский: `/es/`
- немецкий: `/de/`

Переключатель языка ведёт на отдельные страницы, а не заменяет текст внутри JavaScript. Поэтому весь текст остаётся доступен поисковикам. В проект уже добавлены `canonical`, `hreflang`, Open Graph, `robots.txt`, sitemap и разметка `Person` для поисковых систем.

## Что можно редактировать без кода

Открой один файл:

```text
src/content/profile/site.yaml
```

Там находятся:

- имя и LinkedIn;
- заголовки и описания;
- все тексты для EN / ES / DE;
- SEO title и description;
- подписи и тексты формы.

После изменения сохрани файл и выполни `npm run build` для проверки. Когда сайт будет подключён к GitHub и Cloudflare Pages, достаточно будет сделать Commit и Push — Cloudflare пересоберёт сайт сама.

## Как заменить фотографию

Замени этот файл, сохранив такое же имя:

```text
public/images/oleg-linkedin.jpg
```

Лучше использовать квадратный JPG/PNG от 800 × 800 px.

## Как открыть сайт у себя на компьютере

Нужен Node.js 22.12 или новее.

```powershell
npm install
npm run dev
```

Открой адрес, который покажет Astro, обычно:

```text
http://localhost:4321/
```

Проверка статической сборки:

```powershell
npm run build
```

## Подключение Formspree и Cloudflare Turnstile

Форма уже подключена: Formspree endpoint и публичный Turnstile Site Key добавлены в `.env`. Turnstile Secret Key остаётся только в Formspree, поэтому в коде и в GitHub его нет.

### 1. Создай Formspree-форму

Форма Formspree уже создана и подключена к `oleg.fadeev@gmail.com`. Endpoint находится в `.env` и `.env.example`.

### 2. Создай Turnstile widget

Turnstile уже создан в режиме **Managed**, а Formspree CAPTCHA включена.

- **Site Key** уже добавлен в `.env` — это публичное значение.
- **Secret Key** уже хранится в Formspree и не должен попадать в код, `.env`, GitHub или Cloudflare Pages.

Перед публикацией в Turnstile добавь также `www.fadeev.eu` в разрешённые hostname. `localhost` добавляй только если захочешь проверять отправку формы на своём компьютере.

### 3. Локально: добавь `.env`

Файл `.env` уже приложен для локального запуска. Он находится в `.gitignore`, поэтому при использовании GitHub не будет опубликован.

**Важно:** если в Turnstile не добавлен hostname `localhost`, форма на `http://localhost:4321` покажет ошибку hostname. Это не влияет на работу на `fadeev.eu` после публикации.

## Как опубликовать через Cloudflare Pages

1. Создай пустой GitHub repository, например `fadeev-eu`.
2. Загрузите туда файлы этого проекта и сделай Push в ветку `main`.
3. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
4. Выбери репозиторий. В build settings укажи:

```text
Build command: npm run build
Build output directory: dist
```

5. В Pages project открой **Settings → Environment variables** и создай для Production:

```text
PUBLIC_FORMSPREE_ENDPOINT = https://formspree.io/f/xovrgooa
PUBLIC_TURNSTILE_SITE_KEY = 0x4AAAAAADqycV-_nIQriDx-
```

6. Нажми **Save** и заново запусти deployment.
7. В Pages project → **Custom domains** добавь `fadeev.eu`, потом `www.fadeev.eu`.
8. После проверки обеих версий создай Cloudflare Redirect Rule: `www.fadeev.eu/*` → `https://fadeev.eu/$1`.

## Что уже сделано

- дизайн v8 перенесён в Astro;
- фото хранится локально, а не под внешней LinkedIn-ссылкой;
- EN / ES / DE являются отдельными статическими и индексируемыми страницами;
- данные профиля вынесены в YAML;
- контактная форма готова к Formspree;
- Cloudflare Turnstile подключается через публичный Site Key;
- Turnstile загружается только после добавления ключа;
- Turnstile token сбрасывается после успешной отправки;
- есть доступная форма, honeypot-поле и статусы отправки.
