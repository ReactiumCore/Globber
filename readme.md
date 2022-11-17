# globber

Recursively match files using the patterns the shell uses

## Features

-   Promise API
-   Multiple patterns
-   Negated patterns: `['foo*', '!foobar']`
-   Expands directories: `foo` → `foo/**/*`
-   Supports `.gitignore` and similar ignore config files

## Install

```
$ npm install --save @atomic-reactor/globber
```

## Usage

```
├── unicorn
├── cake
└── rainbow
```

```js
// Async
const globber = require('@atomic-reactor/globber');
const paths = await globber(['*', '!cake']);

console.log(paths);

//=> ['unicorn', 'rainbow']

// Sync

const globber = require('@attomic-reactor/globber');
const paths = globber.sync(['*', '!cake']);

console.log(paths);

//=> ['unicorn', 'rainbow']
```

## API

Note that glob patterns can only contain forward-slashes, not backward-slashes, so if you want to construct a glob pattern from path components, you need to use `path.posix.join()` instead of `path.join()`.

### globber(patterns, options?)

Returns a `Promise<string[]>` of matching paths.

#### patterns

Type: `string | string[]`

See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### options

Type: `object`

##### expandDirectories

Type: `boolean`\
Default: `true`

If set to `true`, `globby` will automatically glob directories for you. If you define an `Array` it will only glob files that matches the patterns inside the `Array`. You can also define an `object` with `files` and `extensions` like below:

```
├── unicorn
├── cake
├──── chocolate.jpg
├──── yellow.jpg
└── rainbow.jpg
```

```js
const globber = require('@atomic-reactor/globber');

(async () => {
    const paths = await globber('images', {
        expandDirectories: false,
    });

    console.log(paths);
    //=> ['rainbow.jpg']
})();
```

##### gitignore

Type: `boolean`\
Default: `false`

Respect ignore patterns in `.gitignore` files that apply to the globbed files.

##### ignoreFiles

Type: `string[]`\
Default: `undefined`

Glob patterns to look for ignore files, which are then used to ignore globbed files.

### globber.sync(patterns, options?)

Async version of globber.

## Globbing patterns

Just a quick overview.

-   `*` matches any number of characters, but not `/`
-   `?` matches a single character, but not `/`
-   `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
-   `{}` allows for a comma-separated list of "or" expressions
-   `!` at the beginning of a pattern will negate the match

[Various patterns and expected matches.](https://github.com/micromatch/micromatch)
