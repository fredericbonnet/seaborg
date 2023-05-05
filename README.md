# Seaborg: a Doxygen to Markdown converter

Seaborg converts [Doxygen](https://www.doxygen.nl/index.html) XML output to
Markdown.

## License

Seaborg is released under the terms of the The 3-Clause BSD License:

https://opensource.org/licenses/BSD-3-Clause

## Installation

The Seaborg command line interface is provided as a standard NPM package:

```sh
npm install -g @seaborg/cli
```

## Usage

```sh
seaborg <input> <output>
```

- `input` is the Doxygen XML output directory
- `output` is the output directory

## Who is Seaborg?

Seaborg was named in honor of the American chimist and Nobel Prize laureate
[Glenn Theodore Seaborg](https://en.wikipedia.org/wiki/Glenn_T._Seaborg),
co-discoverer of many chemical elements including
[mendelevium](https://en.wikipedia.org/wiki/Mendelevium). The symbol for
mendelevium is **Md**, which happens to match the filename extension `.md` used
with Markdown files. As Doxygen itself is a pun on another chemical element
(oxygen, obviously), this makes for a very happy coincidence.

## Why Seaborg?

Doxygen is my tool of choice when I work on C/C++/C# projects, either
professionally or personally. Several of my Open Source projects hosted on
GitHub use Doxygen for their reference documentation:

- [PicoTest](https://github.com/fredericbonnet/picotest): A minimalist unit
  testing framework for C programs (you can find the Doxygen-generated
  documentation
  [here](https://fredericbonnet.github.io/picotest/html/index.html))
- [Colibri](https://github.com/fredericbonnet/colibri): A fast and lightweight
  garbage-collected datatype library
- [CoATL](https://github.com/fredericbonnet/coatl): A companion library to
  Colibri that provides advanced features

While I'm perfectly happy with the raw output of Doxygen, I feel that the
generated HTML files are outdated and leave too little room for customization.

And despite their limitations, newer formats such as Markdown or AsciiDocs are
much more enjoyable to work with than plain HTML. Markdown itself benefits from
a vast ecosystem of modern tools with native support on all major IDEs and
online platforms (including GitHub). I'm personally a big fan of
[Docsify](https://docsify.js.org/) but there are so many static and dynamic
documentation site generators to choose from!

Converting Doxygen to Markdown would ease integration with these ecosystems.
Parsing the HTML is out of question, fortunately Doxygen provides raw XML output
of its internal structures, and this is the path that [many tools
take](https://www.doxygen.nl/helpers.html#dox_xmlexamples).

I've considered using existing Doxygen-to-Markdown converters such as
[Doxybook](https://github.com/matusnovak/doxybook),
[Moxygen](https://github.com/sourcey/moxygen) or
[doxygen2md](https://github.com/pferdinand/doxygen2md), but none of them fitted
my needs: either I didn't like the output (personal opinion) or they didn't
support all the features I needed, and I couldn't find the energy to study their
code and contribute a patch. That is the reason why I dedided to start working
on a clean state with my own views on the architecture of the solution and the
desired output. Hence Seaborg!
