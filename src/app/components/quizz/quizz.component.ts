import { Component, OnInit } from '@angular/core';
import quizzData from '../../../assets/data/quizz-quetions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.sass']
})


export class QuizzComponent implements OnInit {
  asks: any
  askSelected: any
  askIndex: number = 0
  askIndexMax: number = 0
  response: string[] = []
  responseSelected: string = ''
  title: string = ''
  finished: boolean = false


  ngOnInit(): void {
    if (quizzData) {

      this.finished = false
      this.title = quizzData.title
      this.asks = quizzData.questions
      this.askSelected = this.asks[this.askIndex]

      this.askIndex = 0
      this.askIndexMax = this.asks.length
    }
  }

  playerChoose(value: string): void {
    this.response.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.askIndex += 1

    if (this.askIndexMax > this.askIndex) {
      this.askSelected = this.asks[this.askIndex]
    } else {
      const finalResponse: string = await this.checkResult(this.response)
      this.finished = true
      this.responseSelected = quizzData.results[finalResponse as keyof typeof quizzData.results]
    }
  }

  checkResult(response: string[]) {
    const result = response.reduce((prev, cur, ind, arr) => {
      if (
        arr.filter(item => item === prev).length >
        arr.filter(item => item === cur).length
      ) {
        return cur
      } else {
        return prev
      }

    })
    return result
    
  }
}
