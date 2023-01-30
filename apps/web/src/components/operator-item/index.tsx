import React, { useEffect } from 'react';
import { Divider, Typography } from '@mui/material';
import { useOperatorsState } from '../../state/operators';
import { Fetchable } from '../fetchable';
import { TripList } from '../trip-list';
import { Titled } from '../titled';
import { OperatorSummary } from '../operator-summary';

interface Props {
  id: string;
}

export const OperatorItem: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useOperatorsState(s => [s.loadOperatorStatus, s.loadOperator, s.operator]);

  useEffect(() => {
    if (id) {
      loadOperator(id);
    }
  }, [id]);

  return (
    <>
      <Fetchable
        status={loadOperatorStatus}
        error={<Typography>There was an error loading the operator</Typography>}
      >
        <OperatorSummary operator={operator!} />
      </Fetchable>
      
      <Divider sx={{ mb: 3, mt: 3 }} />

      <Titled title="Trips">
        <TripList operatorId={id} />
      </Titled>
    </>
  )
}
