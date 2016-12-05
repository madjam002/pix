import React from 'react'
import cx from 'classnames'
import {connect} from 'react-redux'
import {gql, connectGraph} from 'react-graphql'
import {Popover, Position, NonIdealState, Tag, ProgressBar, Intent} from 'ui'

import styles from './index.less'

const JobsPopover = connect(
  store => ({
    jobs: store.jobs.jobs,
  }),
)(({ jobs }) => (
  jobs.length === 0
  ? <NonIdealState title="No jobs running" visual="properties" description="Jobs will appear here with progress when running" />
  : (
    <ul className={cx('pt-menu', styles.jobList)}>
      {jobs.map(job =>
        <IndexJob key={job.id} job={job} />
      )}
    </ul>
  )
))

export const JobsPopoverMenuItem = connect(
  store => ({
    jobCount: store.jobs.jobs.length,
  }),
)(props => (
  <Popover content={<JobsPopover />} position={Position.BOTTOM_RIGHT}>
    <button className="pt-button pt-minimal pt-icon-properties">
      {props.jobCount > 0 && <Tag>{props.jobCount}</Tag>}
    </button>
  </Popover>
))

export const IndexJob = connectGraph({
  query: () => gql`
    query($libraryId: ID!) {
      library(id: $libraryId) {
        id
        name
      }
    }
  `,
  variables: props => ({
    libraryId: props.job.data.libraryId,
  }),
})(({ job, library }) => (
  <li key={job.id} className={styles.job}>
    <h5>Indexing {library.name}</h5>
    <ProgressBar
      value={job.progress != null ? job.progress / 100 : null}
      className={cx(job.progress != null && 'pt-no-stripes')}
      intent={Intent.PRIMARY}
    />
    {job.progressData && <div className={cx('pt-text-muted', styles.jobStatus)}>Processing {job.progressData.currentName}</div>}
  </li>
))
