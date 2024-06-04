import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setHighlightedQuote,
  toggleVisibility,
} from '../state/quotesSlice'

import { useGetQuotesQuery, useDeleteQuotesMutation, useToggleFakeMutation } from '../state/quotesApi'

export default function Quotes() {

const { 
  data : quotes,
  error: quotesError,
    isLoading: quotesLoading,
    isFetching: quotesFetching,
} = useGetQuotesQuery()

const [deleteQuote,{
  error:deletionError,
  isLoading: deletingQuote,
}] = useDeleteQuotesMutation()
const [toggleFake,{
  error: togglingError,
  isLoading: toggling,
}] = useToggleFakeMutation()
//console.log(quotes)

  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
  const dispatch = useDispatch()
  return (
    <div id="quotes">
      <h3>Quotes</h3>
       { quotesLoading ? <p>Loading Quotes...</p> :
        deletingQuote ? <p>Deleting Quote...</p> :
        toggling ? <p>Changing Quote...</p>
       
       : <div>
        {
          quotes?.filter(qt => {
            return displayAllQuotes || !qt.apocryphal
          })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt)} >DELETE</button>
                  <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                  <button onClick={() => toggleFake(qt)} >FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>}
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
