import moment from "moment";
import _ from 'lodash';
const txnSectionGenerator = (transactions) => {
    // console.log(transactions);
    let resultObject = {};
    let result = [];
    _.map(transactions, (txn) => {
        const section = moment(txn.transactionDate).format('DD-MM-YYYY');
        if (resultObject[section]) {
            resultObject[section].push(txn);
        } else {
            resultObject[section] = [txn];
        }
    });
    _.map(_.keysIn(resultObject), (obj) => {
        result.push({title: obj, data: resultObject[obj]})
    });
    return result;
}
export default txnSectionGenerator;