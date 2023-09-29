import React, { useState } from "react";
import styles from "../../../styles.module.css";
import {
  Trade,
  TradeEntity,
  TradeIndex,
  TradeOption,
  TradeType,
} from "src/Models";
import moment from "moment";
import api from "src/Services/api";

interface AddTradeProps {
  close: Function;
  date: moment.Moment | null;
}

export default function AddTrade(props: AddTradeProps) {
  const { close, date } = props;

  const [tradeForm, updateTradeForm] = useState<TradeEntity>(
    new TradeEntity(date ? date.toISOString() : moment().toISOString())
  );
  const tradeIndex = Object.values(TradeIndex);
  const tradeOption = Object.values(TradeOption);
  const tradeType = Object.values(TradeType);

  const updateTradeFormView = (e: any) => {
    const { name, value } = e.target;

    updateTradeForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveTrade = (e: any) => {
    e?.preventDefault();

    const formValue: any = tradeForm;
    const payload = Object.keys(formValue).reduce((acc: any, item: string) => {
      if (["strikePrice", "slots", "transactionPrice"].includes(item)) {
        const v = (formValue[item] as any).toString();
        acc[item] = parseInt(formValue[item].toString());
        return acc;
      } else {
        acc[item] = formValue[item];
        return acc;
      }
    }, {});
    api
      .addTrade(payload)
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          close();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const detailedForm = (
    <div className={`${styles.tradeform} ${styles.centerItems}`}>
      <form onSubmit={saveTrade}>
        <div>
          <select
            placeholder="Select Index"
            className={styles.formControl}
            value={tradeForm.index}
            name="index"
            onChange={updateTradeFormView}
            required
          >
            {tradeIndex.map((index) => {
              return (
                <option value={index} key={index}>
                  {index}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            placeholder="Select Type"
            className={styles.formControl}
            value={tradeForm.trade}
            name="trade"
            onChange={updateTradeFormView}
            required
          >
            {tradeType.map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            placeholder="Select Option"
            className={styles.formControl}
            value={tradeForm.option}
            name="option"
            onChange={updateTradeFormView}
            required
          >
            {tradeOption.map((option) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <input
            placeholder="Strike Price"
            type="number"
            className={styles.formControl}
            value={tradeForm.strikePrice}
            name="strikePrice"
            onChange={updateTradeFormView}
            required
            min={0}
          ></input>
        </div>
        <div>
          <input
            placeholder="Transaction Price"
            type="number"
            className={styles.formControl}
            value={tradeForm.transactionPrice}
            name="transactionPrice"
            onChange={updateTradeFormView}
            required
            min={0}
          ></input>
        </div>
        <div>
          <input
            placeholder="Number of Lots"
            type="number"
            className={styles.formControl}
            value={tradeForm.slots}
            name="slots"
            onChange={updateTradeFormView}
            required
            min={0}
          ></input>
        </div>

        <div>
          <textarea
            placeholder="Comments"
            className={styles.formControl}
            value={tradeForm.comments}
            name="comments"
            onChange={updateTradeFormView}
          ></textarea>
        </div>
        <div>
          <button>Cancel</button> &nbsp;
          <button>Submit</button>
        </div>
      </form>
    </div>
  );

  const savePnl = (e: any) => {
    e?.preventDefault();
    api
      .savePnl({
        date: tradeForm.date,
        amount: isProfitLoss * amount,
      })
      .then((response: any) => {
        console.log(response);
        if (response.status === 201) {
          close();
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const setProfitLoss = (e: any) => {
    setIsProfitLoss(parseInt(e.target.value));
  };

  const [isProfitLoss, setIsProfitLoss] = useState<number>(1);

  const [amount, setAmount] = useState<number>(0);

  const setTotalAmount = (e: any) => {
    setAmount(parseInt(e.target.value));
  };

  const pnlForm = (
    <div className={`${styles.tradeform} ${styles.centerItems}`}>
      <form onSubmit={savePnl}>
        <div className={`${styles.flexRow} ${styles.centerItems}`}>
          <label htmlFor="profit">Profit</label>
          <input
            type="radio"
            name="pnl"
            value={1}
            id="profit"
            onChange={setProfitLoss}
            defaultChecked={true}
          />

          <label htmlFor="loss">Loss</label>
          <input
            type="radio"
            name="pnl"
            value={-1}
            id="loss"
            onChange={setProfitLoss}
          />
        </div>

        <div>
          <input
            value={amount}
            onChange={setTotalAmount}
            placeholder="Enter amount"
            type="number"
            required
          />
        </div>
        <div>
          <button type="button" onClick={() => close()}>
            Cancel
          </button>
          &nbsp;
          <button type="submit" onClick={savePnl}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  const [isDetailsForm, setEnableDetailsForm] = useState(false);

  const setDetailsView = (event: any) => {
    setEnableDetailsForm(event.target.checked);
  };

  return (
    <div className={styles.sideBar}>
      <div className={`${styles.flexRow} ${styles.centerItems}`}>
        <h3>Add/Edit Trade {date?.format("dd-MMM-yyyy")}</h3>
        <button
          onClick={() => close()}
          style={{
            float: "right",
            fontWeight: "bolder",
            fontSize: "larger",
            cursor: "pointer",
          }}
        >
          X
        </button>
      </div>

      <div>
        <label>Add Details : </label>
        <input
          type="checkbox"
          checked={isDetailsForm}
          onChange={setDetailsView}
        />
      </div>

      {isDetailsForm ? detailedForm : pnlForm}
    </div>
  );
}
