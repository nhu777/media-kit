export default function ArborTypographyPage() {
  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-title-xl text-primary">Arbor Typography</h1>
          <p className="text-body-base text-secondary">
            All text styles from the Arbor design system
          </p>
        </div>

        {/* Title Classes */}
        <section className="space-y-6">
          <h2 className="text-body-sm-emph text-tertiary uppercase tracking-wider">
            Title Classes
          </h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-title-xl</p>
              <p className="text-title-xl text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-title-lg</p>
              <p className="text-title-lg text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-title-md</p>
              <p className="text-title-md text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-title-sm</p>
              <p className="text-title-sm text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Body Classes */}
        <section className="space-y-6">
          <h2 className="text-body-sm-emph text-tertiary uppercase tracking-wider">
            Body Classes
          </h2>
          <div className="space-y-4">
            {/* Body LG */}
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-lg</p>
              <p className="text-body-lg text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-lg-emph</p>
              <p className="text-body-lg-emph text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            {/* Body Base */}
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-base</p>
              <p className="text-body-base text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-base-emph</p>
              <p className="text-body-base-emph text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            {/* Body SM */}
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-sm</p>
              <p className="text-body-sm text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-sm-emph</p>
              <p className="text-body-sm-emph text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            {/* Body XS */}
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-xs</p>
              <p className="text-body-xs text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-xs-emph</p>
              <p className="text-body-xs-emph text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            {/* Body XXS */}
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-xxs</p>
              <p className="text-body-xxs text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body-xs text-tertiary">text-body-xxs-emph</p>
              <p className="text-body-xxs-emph text-primary">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
