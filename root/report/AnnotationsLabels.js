/*
 * @flow
 * Copyright (C) 2018 MetaBrainz Foundation
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

import * as React from 'react';

import {withCatalystContext} from '../context';
import Layout from '../layout';
import formatUserDate from '../utility/formatUserDate';
import {l} from '../static/scripts/common/i18n';

import LabelAnnotationList from './components/LabelAnnotationList';
import FilterLink from './FilterLink';
import type {ReportDataT, ReportLabelAnnotationT} from './types';

const AnnotationsLabels = ({
  $c,
  canBeFiltered,
  filtered,
  generated,
  items,
  pager,
}: ReportDataT<ReportLabelAnnotationT>) => (
  <Layout fullWidth title={l('Label annotations')}>
    <h1>{l('Label annotations')}</h1>

    <ul>
      <li>
        {l('This report lists labels with annotations.')}
      </li>
      <li>{l('Total labels found: {count}', {count: pager.total_entries})}</li>
      <li>{l('Generated on {date}', {date: formatUserDate($c.user, generated)})}</li>

      {canBeFiltered ? <FilterLink filtered={filtered} /> : null}
    </ul>

    <LabelAnnotationList items={items} pager={pager} />

  </Layout>
);

export default withCatalystContext(AnnotationsLabels);