
import { render, fireEvent, screen } from '@testing-library/vue'
import Home from './Home.vue'
import { apiService } from "@/services/api.service";

test('increments value on click', async () => {
  render(<Home />)

  apiService.get = jest.fn()

  screen.getByText("Tree Chart").toBeDefined()

})