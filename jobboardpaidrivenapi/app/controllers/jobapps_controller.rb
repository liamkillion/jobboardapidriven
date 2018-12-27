require 'rest-client'

class JobAppsController < ApplicationController



  def create
    let url = "https://boards-api.greenhouse.io/v1/boards/cardboard/jobs/"
  end

  # private
  # def jobapp_params
  #   params.require(:jobapp).permit(:name, :lastDateSeen, :desiredFrequency, :notes)
  # end
end

  #   "first_name": "Sammy",
  #   "last_name": "McSamson",
  #   "email": "sammy@example.com",
  #   "phone": "3337778888",
  #   "location": "110 5th Ave New York, NY, 10011",
  #   "latitude": "40.7376671",
  #   "longitude": "-73.9929196",
  #   "resume_text": "I have many years of experience as an expert basket weaver...",
  #   "cover_letter_text": "I have a very particular set of skills, skills I have acquired over a very long career. Skills that make me...",
  #   "gender": 2,
  #   "race": 4,
  #   "veteran_status": 3,
  #   "disability_status": 3,
  #   "question_12345": "Here is some short text for the first question",
  #   "question_12346": 1,
  #   "question_12347": 5869311,
  #   "question_12348": [5869319,5869317],
  #   "question_12349_url": "http://dropbox.com/dl/attachment.pdf",
  #   "question_12349_url_filename": "attachment.pdf",
  #   "question_12350_content": "SGVsbG8sIHdvcmxkIQo=",
  #   "question_12350_content_filename": "something_else.txt",
  #   "educations": [
  #     {
  #       "school_name_id" : "1403524",
  #       "degree_id": "1403534",
  #       "discipline_id": "1403605",
  #       "start_date": { "month": "1", "year": "1989"},
  #       "end_date": { "month": "2", "year": "1990"}
  #     },
  #     {
  #       "school_name_id" : "1401063",
  #       "degree_id": "1403525",
  #       "discipline_id": "1403608",
  #       "start_date": { "month": "1", "year": "2011"},
  #       "end_date": { "month": "2", "year": "2012"}
  #     }
  #   ],
  #   "employments": [
  #     {
  #       "company_name": "Business Co.",
  #       "title": "Sales Manager",
  #       "start_date": {
  #         "month": "1",
  #         "year": "2016"
  #       },
  #       "end_date": {
  #         "month": "2",
  #         "year": "2018"
  #       },
  #       "current": "false"
  #     }
  #   ],
  #   "mapped_url_token":"token12345",
  #   "demographic_answers":[
  #     {
  #       "question_id": 87,
  #       "answer_options": [
  #         {
  #           "answer_option_id": 194
  #         }
  #       ]
  #     },
  #     {
  #       "question_id": 88,
  #       "answer_options": [
  #         {
  #           "answer_option_id": 212,
  #           "text": "Free-form Answer"
  #         }
  #       ]
  #     }
  #   ]
  # }'
