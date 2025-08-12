```
Usage: peridio releases update [OPTIONS] --prn <PRN>

Options:
      --prn <PRN>
          The PRN of the resource to update

      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --disabled <DISABLED>
          If a release is marked as disabled it cannot be resolved during release resolution

          [possible values: true, false]

      --name <NAME>
          The resource's name, meant to be displayable to users

      --next-release-prn <NEXT_RELEASE_PRN>
          The PRN of the release you wish to create this release before.

          If omitted, the release will be created as latest within the cohort. If there is already at least one release in the cohort, then the latest release in that cohort would have its next_release_prn updated to this created release.

          If supplied, the release will be created prior to the release identified by next_release_prn. If you wish to insert this release between two other releases, you may additionally supply previous_release_prn. If you supply neither field, it will create the release as the latest automatically.

      --phase-mode <PHASE_MODE>
          Describes if this release is using tag or numeric based phasing. tags or phase value for resolution

          - tags - Phases rollout of the release according to the phase_tags field.

          - numeric - Phases rollout of the release according to the phase_value field.

          [possible values: tags, numeric]

      --phase-tags [<PHASE_TAGS>...]
          Limits by tags the devices that are allowed to update to this release. When phase_mode is tags, this field only allows devices to update to this release if they have at least one of these tags.

          Values can be provided by passing each value in a flag or by delimiting all values with ","

      --phase-value <PHASE_VALUE>
          The phase value controls the distribution of the update to your fleet.

          Decimals in [0.0, 1.0] are treated as percents, e.g., to allow 20% of the cohort to update, you would specify 0.2.

          Integers >= 2 are treated as absolute device counts, e.g., to allow 40 of the cohort's devices to update, you would specifiy 40.

          NOTE: 1 is a special value in that it represents 100% and once a release is updated to this value, the phase value can never be changed again.

          A release with a phase_value not equal to 1 is considered "phased".

      --required <REQUIRED>
          Whether the release is required.

          If true, this release must be passed through if encountered by a device.

          If false, this release will be skipped over when possible (if there are releases configured after it).

          [possible values: true, false]

      --schedule-date <SCHEDULE_DATE>
          The date at which the release becomes available to devices.

          Before this date-time, the release will not be resolvable when checking for updates. You may use this to schedule a future release.

      --version <VERSION>
          The release version.

          If provided, it has to be a valid version. Used in dynamic release resolution.

      --version-requirement <VERSION_REQUIREMENT>
          The release version requirement.

          If provided, it has to be a valid requirement. Used in dynamic release resolution.

  -h, --help
          Print help (see a summary with '-h')

```
