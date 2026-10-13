<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The Ustudio app lives in src/ustudio (ported from the AI Studio repo) and renders client-only from the index route — it keeps state in browser storage.
- Public-page display preferences and premium media demos remain in browser profile state; Cloud Auth owns professional sign-in while shared catalog and booking persistence must be explicitly migrated before claiming cross-device availability.
- Keep availability calculations in a shared pure utility so public and manual booking apply the same duration, date, hours and buffer rules.
- Home-screen support uses a manifest without offline caching to preserve preview and OAuth navigation.
