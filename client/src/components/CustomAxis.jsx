import React from 'react';
import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';

const CustomXAxis = ({ tickSize = 6, tickMargin = 10, ...props }) => {
  return <RechartsXAxis tickSize={tickSize} tickMargin={tickMargin} {...props} />;
};

const CustomYAxis = ({ tickSize = 6, tickMargin = 10, ...props }) => {
  return <RechartsYAxis tickSize={tickSize} tickMargin={tickMargin} {...props} />;
};

export { CustomXAxis, CustomYAxis };
