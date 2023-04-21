import { Box } from "@mui/material";
import {styled} from '@mui/system';



//the box component allow us to use inline css as much as we want like the component props. 
//re-using css as a component:
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
