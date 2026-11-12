# Comparison notes

Use this shape when a note compares two images or options on the same hardware, for example a stock distribution against Avocado OS. A comparison asks more of the author than a demo, because a reader checks every number against the baseline they know.

## Lead with the strongest measured difference

Compute each difference as a percentage against the strongest honest baseline and against the weakest. A headline must survive the weakest one. Lead with the large differences. Keep a small difference as one result among others and state it plainly. When someone reports a number you cannot reproduce, say you could not reproduce it. Do not guess what they ran.

## Sections, in order

1. **TL;DR.** One sentence with the result and its key numbers. Then one bullet list per option. Each list has the same bullets in the same order: setup, disk, the main resource, production readiness. End with one line for secondary results and the run conditions.
2. **What this is.** Two short paragraphs for a cold reader.
3. **How I measured it.** Answer these every time:
   - which images and versions you used, and how a typical user installs each;
   - native packages or a container;
   - whether a camera or other real input is involved;
   - the protocol, the model or engine, and its checksum;
   - what the recordings show, embedded here.
4. **One section per option**, each with the same three subsections:
   - _Getting started_: what a person does, the number of manual steps, and the problems that cost time.
   - _Timing_: each phase with its duration and where the number comes from.
   - _Takeaways_: the numbers, the experience, and production readiness. End with one line that compares this option against the other in percentages.
5. **Result.** A `<PullQuote>`, an at-a-glance table (Metric, A, B, Difference), and a production readiness table.
6. **Resource sections** (RAM, power, throughput). Use tables with the layout State, A, B and one unit per table. Put the charts after the tables. Keep the bullets under a chart to five short ones. Collapse older or secondary readings in a `<details>` block.
7. **What the headroom buys.** Concrete things the saved resource allows.
8. **Reproduce it.** Both sides, with the prerequisite steps. For example, name the firmware that must be restored before the other image can install.

## Evidence rules

- Run one protocol on both sides: cold boot, a fixed settle time, three idle readings, a fixed-length run, three idle readings. Sample the resource at a fixed interval across the run. Define each metric once.
- Match the configuration on both sides. An image without the power mode and governors set can look faster and draw more power. Keep such a run only as a labelled side reading.
- Keep raw data under `/var/tmp/claude-code/<project>/<date>-<slug>/`. Regenerate every table and chart from it.
- State the run count. Label one-boot figures as one boot. Keep every hedge as a hedge.
- Do not present an unmeasured claim as measured. Say what you did not measure.
- Cite what a reader can open: a PR, a public page, a release. Name every change the note depends on that is not published.
- Cite a released version of the tool. If a development build produced the measured image, say so in the text.

## Charts

- Use a static SVG when a chart needs a legend. Mermaid `xychart-beta` cannot draw one.
- Choose colours with the `dataviz` skill, and validate them in light and dark mode. Do not encode identity by colour alone. Add a legend and direct labels.
- Give the SVG its own light surface so it reads under either site theme. Put the numbers in the alt text.
- Useful charts: the resource over time through the run with the run window shaded, a grouped bar of idle, average and peak, and load over time. Use means over a few seconds for noisy load lines, and say so.
- Render each SVG to a PNG and look at it before you commit. A colour validator does not catch overlapping labels.

## Recordings

Embed a recording as a responsive wrapper `div` that holds an `iframe` with the YouTube embed URL. Give the `iframe` a `title`. The build inlines small images as data URIs, so a search for an image file name in the built HTML finds nothing. Search for the alt text instead.
